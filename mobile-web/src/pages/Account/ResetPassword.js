import React from 'react';
import { useLocation, useNavigate } from "react-router";
import { Formik, Form, Field } from 'formik';
import * as Yup from "yup";
import {
  MDBContainer,
  MDBInput,
  MDBBtn,
}
from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

const ResetPassword = () => {
    const navigate = useNavigate();
    const { account } = useLocation();
    const updateMember = async (password) => {
        const req_body = {
            "member_account": account,
            "update_data": {
                "password": password
            }
        };

        const request = await fetch( 'http://localhost:5277/member/updateMember', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req_body)
        });

        let response = await request.json();
        if (request.status == 200) {
            return response;
        } else {
            return {
                "metadata": {
                    "status": "error",
                    "desc": "註冊失敗，請聯絡客服"
                },
                "data": {
                    "data": ""
                }
            };
        }
    };

    return (
        <MDBContainer className="p-3 mt-5 d-flex flex-column w-100">
            <h3>重設密碼</h3>
            <Formik
                initialValues={{
                    password: undefined,
                    password_confirm: undefined
                }}
                validationSchema={Yup.object({
                    password: Yup.string()
                        .matches(/^[A-Za-z0-9]{9,16}$/,"*密碼長度為9-16之間的大小寫英文字母或數字")
                        .matches(/^.*(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/, "*大小寫英文字母或數字必須皆有")
                        .required("*密碼不能為空"),
                    password_confirm: Yup.string()
                        .when('password', (password, schema) => {
                            return password ? schema.oneOf([password], '*密碼需相同').required() : schema
                        })
                        .required("*密碼需相同"),
                })}
                onSubmit={async (value, { resetForm }) => {
                    updateMember(value.password).then((response) => {
                        if(response.metadata.status == 'success') 
                            navigate('/login', {
                                state: '/account'
                            });

                    });
                    resetForm();
                }}
            >
                {({ errors, touched }) => (
                    <Form>
                        <Field as={MDBInput} wrapperClass='mt-1' label='輸入新密碼' id='form1' name='password' />
                        {errors.password && touched.password ? (
                            <div className='error-message active'>{errors.password}</div>
                        ) : <div className='error-message hidden'>正確格式</div>}

                        <Field as={MDBInput} wrapperClass='mt-1' label='密碼再次確認' id='form2' name='password_confirm' />
                        {errors.password_confirm && touched.password_confirm ? (
                            <div className='error-message active'>{errors.password_confirm}</div>
                        ) : <div className='error-message hidden'>正確格式</div>}

                        <div className='d-flex w-100'>
                            <MDBBtn className="mb-2 mx-2 w-50" type="submit">送出</MDBBtn>
                            <MDBBtn tag='a' href='/login' className="btn-light mb-2 mx-2 w-50">取消</MDBBtn>
                        </div>
                    </Form>
                )}
            </Formik>
        </MDBContainer>
    );
};
export default ResetPassword;
