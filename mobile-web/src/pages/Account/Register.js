import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from "yup";
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon
}
from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import './Account.css';

const Register = () => {
    const navigate = useNavigate();
    const createMember = async (req_body, callback) => {
        const request = await fetch( 'http://localhost:5277/member/createMember', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req_body)
        });

        let response = await request.json();
        if (request.status == 200) {
            callback(response);
        } else {
            callback({
                "metadata": {
                    "status": "error",
                    "desc": "註冊失敗，請聯絡客服"
                },
                "data": {
                    "data": ""
                }
            });
        }
    };

    return (
        <MDBContainer className="register-container p-3 mt-1 mb-6 d-flex flex-column w-100">
            <h3>註冊</h3>
            <Formik
                initialValues={{ 
                    email: undefined, 
                    password: undefined,
                    password_confirm: undefined,
                    name: undefined,
                    telphone: undefined,
                    agreecheckbox: false
                }}
                validationSchema={Yup.object({
                    email: Yup.string()
                        .email("*請輸入正確格式的信箱")
                        .required("*電子信箱不能為空"),
                    password: Yup.string()
                        .matches(/^[A-Za-z0-9]{9,16}$/,"*密碼長度為9-16之間的大小寫英文字母或數字")
                        .required("*密碼不能為空"),
                    password_confirm: Yup.string()
                        .when('password', (password, schema) => {
                            return password ? schema.oneOf([password], '*密碼需相同').required() : schema
                        }),
                    name: Yup.string()
                        .required("*名稱不能為空"),
                    telphone: Yup.string()
                        .matches(/^[0-9]{10,10}$/,"*電話為10碼數字"),
                    agreecheckbox: Yup.boolean()
                        .isTrue("需同意服務條款")
                })}
                onSubmit={(value, { resetForm }) => {
                    createMember({
                        "member_account": value.email,
                        "password": value.password,
                        "login_type": "Registered",
                        "member_name": value.name,
                        "telephone": value.telphone
                    }, (response) => {
                        if(response.metadata.status == 'success') 
                            navigate('/login');
    
                        document.getElementsByClassName('register-message')[0].innerHTML = response.metadata.desc;
                        document.getElementsByClassName('register-message')[0].classList.remove("hidden");
                        document.getElementsByClassName('register-message')[0].classList.add("active");
                        resetForm();
                    });

                }}
            >
                {({errors, touched}) => (
                    <Form>
                        <Field as={MDBInput} wrapperClass='mt-1' label='電子郵件' id='form1' name='email'/>
                        {errors.email && touched.email ? (
                            <div className='error-message active'>{errors.email}</div>
                        ) : <div className='error-message hidden'>正確格式</div>}
 
                        <Field as={MDBInput} wrapperClass='mt-1' label='密碼' id='form2' name='password'/>
                        {errors.password && touched.password ? (
                            <div className='error-message active'>{errors.password}</div>
                        ) : <div className='error-message hidden'>正確格式</div>}

                        <Field as={MDBInput} wrapperClass='mt-1' label='密碼再次確認' id='form3' name='password_confirm'/>
                        {errors.password_confirm && touched.password_confirm ? (
                            <div className='error-message active'>{errors.password_confirm}</div>
                        ) : <div className='error-message hidden'>正確格式</div>}

                        <Field as={MDBInput} wrapperClass='mt-1' label='名稱' id='form4' name='name'/>
                        {errors.name && touched.name ? (
                            <div className='error-message active'>{errors.name}</div>
                        ) : <div className='error-message hidden'>正確格式</div>}

                        <Field as={MDBInput} wrapperClass='mt-1' label='手機號碼' id='form5' name='telphone'/>
                        {errors.telphone && touched.telphone ? (
                            <div className='error-message active'>{errors.telphone}</div>
                        ) : <div className='error-message hidden'>正確格式</div>}

                        <Field as={MDBCheckbox} className='mt-1 mb-1' label='我同意服務條款' id='flexCheckDefault' name='agreecheckbox'/>
                        {errors.agreecheckbox && touched.agreecheckbox ? (
                            <div className='error-message active'>{errors.agreecheckbox}</div>
                        ) : <div className='error-message hidden'>正確格式</div>}

                        <div className='d-flex w-100'>
                            <MDBBtn className="mb-2 mx-2 w-50" type="submit">送出</MDBBtn>
                            <MDBBtn tag='a' href='/login' className="btn-light mb-2 mx-2 w-50">取消</MDBBtn>
                        </div>
                        <div className='register-message hidden'> 註冊結果 </div>
                    </Form> 
                )}
            </Formik>
            
            <div className="text-center">
                <p>或 以下列方式登入:</p>
                <div className='d-flex justify-content-between mx-auto' style={{width: '60%'}}>
                    <MDBBtn tag='a' color='none' className='btn btn-primary btn-floating mx-1' style={{ color: '#fff' }}>
                        <MDBIcon fab icon='facebook-f' size="sm"/>
                    </MDBBtn>

                    <MDBBtn tag='a' color='none' className='btn btn-primary btn-floating mx-1' style={{ color: '#fff' }}>
                        <MDBIcon fab icon='twitter' size="sm"/>
                    </MDBBtn>

                    <MDBBtn tag='a' color='none' className='btn btn-primary btn-floating mx-1' style={{ color: '#fff' }}>
                        <MDBIcon fab icon='google' size="sm"/>
                    </MDBBtn>

                    <MDBBtn tag='a' color='none' className='btn btn-primary btn-floating mx-1' style={{ color: '#fff' }}>
                        <MDBIcon fab icon='github' size="sm"/>
                    </MDBBtn>
                </div>
            </div>
        </MDBContainer>
    );
}
export default Register
