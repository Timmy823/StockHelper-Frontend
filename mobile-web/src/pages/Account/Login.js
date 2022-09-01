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

const Login = () => {
    const navigate = useNavigate();
    const Login = async (req_body, callback) => {
        const request = await fetch( 'http://localhost:5277/member/getMemberInfo', {
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
                    "desc": "登入失敗，請聯絡客服"
                },
                "data": {
                }
            });
        }
    };

    return (
        <MDBContainer className="p-3 mt-1 d-flex flex-column w-100">
            <h3>登入</h3>
            <Formik
                initialValues={{ 
                    account: undefined, 
                    password: undefined
                }}
                validationSchema={Yup.object({
                    account: Yup.string()
                        .email("*請輸入正確格式的信箱")
                        .required("*電子信箱不能為空"),
                    password: Yup.string()
                        .matches(/^[A-Za-z0-9]{9,16}$/,"*密碼長度為9-16之間的大小寫英文字母或數字")
                        .matches(/^.*(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/, "*大小寫英文字母或數字必須皆有")
                        .required("*密碼不能為空")
                })}
                onSubmit={(value, { resetForm }) => {
                    Login({
                        "member_account": value.account,
                        "password": value.password
                    }, (response) => {
                        console.log(response);
                        if(response.metadata.status === 'success') 
                            navigate('/account');

                        document.getElementsByClassName('login-message')[0].innerHTML = response.metadata.desc;
                        document.getElementsByClassName('login-message')[0].classList.remove("hidden");
                        document.getElementsByClassName('login-message')[0].classList.add("active");
                    });
                }}
            >
                {({errors, touched}) => (
                    <Form>
                        <Field as={MDBInput} wrapperClass='mt-1' label='電子郵件' id='form1' name='account'/>
                        {errors.account && touched.account ? (
                            <div className='error-message active'>{errors.account}</div>
                        ) : <div className='error-message hidden'>正確格式</div>}

                        <Field as={MDBInput} wrapperClass='mt-1' label='密碼' id='form2' name='password'/>
                        {errors.password && touched.password ? (
                            <div className='error-message active'>{errors.password}</div>
                        ) : <div className='error-message hidden'>正確格式</div>}
                    </Form>
                )}
            </Formik>

            <div className="d-flex justify-content-between mx-3 my-2">
                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='記住帳號密碼' />
                <a href="!#">忘記密碼?</a>
            </div>
            <div className='login-message hidden'> 登入成功 </div>
            <MDBBtn className="mb-4">登入</MDBBtn>
            
            <div className="text-center">
                <p>尚未擁有帳號? <a href="/register">註冊</a></p>
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
export default Login
