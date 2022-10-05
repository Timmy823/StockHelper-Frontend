import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import { Formik, Form, Field } from 'formik';
import * as Yup from "yup";
import {
  MDBContainer,
  MDBInput,
  MDBBtn,
}
from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

const VerifyCertification = () => {
    const navigate = useNavigate();
    const [account, setAccount] = useState("");
    const [certification, setCertification] = useState("");

    const sendEmailCertification = async (req_body) => {
        const request = await fetch('http://localhost:5277/member/sendEmailCertification', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req_body)
        });
    
        let response = await request.json();
        if (request.status === 200) {
            return response;
        } else {
            return {
                "metadata": {
                    "status": "error",
                    "desc": "驗證碼傳送失敗，請聯絡客服"
                },
                "data": {
                }
            };
        }
    };

    useEffect(()=>{
        
    },[])
    
    useEffect(()=>{
        if (account !== "") {
            sendEmailCertification({
                'member_account': account
            }).then((response)=>{
                console.log(response);
                if (response['metadata']['status'] === 'success') {
                    setCertification(response['data']['certification_code']);
                    console.log(response['data']['certification_code']);
                }
            });
        }
    }, [account]);

    useEffect(()=>{
        console.log(certification)
    }, [certification]);

    return (
        <MDBContainer className="forget-password-page-input justify-content-center d-flex flex-column w-100">
            {(certification === "") && <>            
                <h3>輸入電子信箱</h3>
                <Formik
                    initialValues={{
                        email: undefined
                    }}
                    validationSchema={Yup.object({
                        email: Yup.string()
                            .email("*請輸入正確格式的信箱")
                            .required("*電子信箱不能為空"),
                    })}
                    onSubmit={async (value, { resetForm }) => {
                        setAccount(value.email);
                        resetForm();
                    }}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <Field as={MDBInput} wrapperClass='mt-1' label='電子郵件' id='form1' name='email' />
                            {errors.email && touched.email ? (
                                <div className='error-message active'>{errors.email}</div>
                            ) : <div className='error-message hidden'>正確格式</div>}

                            <MDBBtn rounded className='mt-4 mb-1 p-3 w-100'> 送出驗證碼</MDBBtn>
                        </Form>
                    )}
                </Formik>
                
            </>}
            {(certification !== "") && <>
                <h3>驗證碼已發送至{account}，請輸入驗證碼</h3>
                <MDBInput wrapperClass='mt-4 p-1 ' label='驗證碼' type='certification' name='certification'/>
                <MDBBtn outline rounded className='mt-4 mb-1 p-3' onClick={
                    () => {
                        let certification_input = document.getElementsByName('certification')[0].value;
                        if (certification_input === certification) {
                            navigate('/reset_password', {
                                member_account: account
                            });
                        } else {
                            console.log('驗證碼錯誤');
                        }
                    }
                }> 驗證</MDBBtn>
                <MDBBtn rounded className='mt-4 mb-1 p-3' onClick={
                    () => {
                        setCertification(sendEmailCertification({
                            'member_account': account
                        }));
                    }
                }> 重新發送驗證碼</MDBBtn>
            </>}
        </MDBContainer>
    );
}
export default VerifyCertification;
