import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from "yup";
import { setAuthToken, getAuthToken } from '../../utils/TokenUtils';
import { accessApiPost } from '../../utils/AccessApiUtils';
import { domain, api_path } from '../../config/route';
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
    const { state } = useLocation();
    const login_token = 'account_info';

    const Login = async (request) => {
        const req_url = domain + api_path.member.get_member_info;
        const req_body = {
            "member_account": request.account,
            "password": request.password
        };

        accessApiPost(req_url, req_body, '登入失敗，請聯絡客服')
            .then((response) => {
                console.log(response);
                if (response.metadata.status === 'success') {
                    setAuthToken(login_token, JSON.stringify(response.data));
                } else {
                    document.getElementsByClassName('login-message')[0].innerHTML = response.metadata.desc;
                    document.getElementsByClassName('login-message')[0].classList.remove("hidden");
                    document.getElementsByClassName('login-message')[0].classList.add("active");

                    return Promise.reject(response.metadata.desc);
                }
            })
            .then(() => {
                if (state === null)
                    navigate('/account');
                navigate(state);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        if (getAuthToken(login_token) !== null)
            navigate('/account');
    }, []);

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
                        .matches(/^[A-Za-z0-9]{9,16}$/, "*密碼長度為9-16之間的大小寫英文字母或數字")
                        .matches(/^.*(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/, "*大小寫英文字母或數字必須皆有")
                        .required("*密碼不能為空")
                })}
                onSubmit={async (value, { resetForm }) => {
                    Login({
                        "account": value.account,
                        "password": value.password
                    });

                    resetForm();
                }}
            >
                {({ errors, touched }) => (
                    <Form>
                        <Field as={MDBInput} wrapperClass='mt-1' label='電子郵件' id='form1' name='account' />
                        {errors.account && touched.account ? (
                            <div className='error-message active'>{errors.account}</div>
                        ) : <div className='error-message hidden'>正確格式</div>}

                        <Field as={MDBInput} wrapperClass='mt-1' label='密碼' id='form2' name='password' />
                        {errors.password && touched.password ? (
                            <div className='error-message active'>{errors.password}</div>
                        ) : <div className='error-message hidden'>正確格式</div>}

                        <div className="d-flex justify-content-between mx-3 my-2">
                            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='記住帳號密碼' />
                            <a href="/verify_certification">忘記密碼?</a>
                        </div>
                        <div className='login-message hidden'> 登入成功 </div>
                        <MDBBtn className="mb-4 w-100">登入</MDBBtn>
                    </Form>
                )}
            </Formik>

            <div className="text-center">
                <p>尚未擁有帳號? <a href="/register">註冊</a></p>
                <p>或 以下列方式登入:</p>

                <div className='d-flex justify-content-between mx-auto' style={{ width: '60%' }}>
                    <MDBBtn tag='a' color='none' className='btn btn-primary btn-floating mx-1' style={{ color: '#fff' }}>
                        <MDBIcon fab icon='facebook-f' size="sm" />
                    </MDBBtn>

                    <MDBBtn tag='a' color='none' className='btn btn-primary btn-floating mx-1' style={{ color: '#fff' }}>
                        <MDBIcon fab icon='twitter' size="sm" />
                    </MDBBtn>

                    <MDBBtn tag='a' color='none' className='btn btn-primary btn-floating mx-1' style={{ color: '#fff' }}>
                        <MDBIcon fab icon='google' size="sm" />
                    </MDBBtn>

                    <MDBBtn tag='a' color='none' className='btn btn-primary btn-floating mx-1' style={{ color: '#fff' }}>
                        <MDBIcon fab icon='github' size="sm" />
                    </MDBBtn>
                </div>
            </div>
        </MDBContainer>
    );
}
export default Login
