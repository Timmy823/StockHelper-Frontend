import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router";
import { Formik, Form, Field } from 'formik';
import * as Yup from "yup";
import { accessApiPost } from '../../utils/AccessApiUtils';
import {
    MDBContainer,
    MDBInput,
    MDBBtn,
}
    from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

const VerifyCertification = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [member_account, setMemberAccount] = useState("");
    const [certification, setCertification] = useState("");

    const sendEmailCertification = async (req_body) => {
        const req_url = 'http://localhost:5277/member/sendEmailCertification';

        accessApiPost(req_url, req_body, '驗證碼傳送失敗，請聯絡客服');
    };

    function randomString(e) {
        e = e || 32;
        const source = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678", len = source.length;
        let result = "";

        for (let i = 0; i < e; i++)
            result += source.charAt(Math.floor(Math.random() * len));

        return result;
    }

    useEffect(() => {
        setMemberAccount(state);
    }, [state])

    useEffect(() => {
        if (member_account !== null && member_account !== "") {
            const code = randomString(7);

            sendEmailCertification({
                'member_account': member_account,
                'certification_code': code
            });

            setCertification(code);
        }
    }, [member_account]);

    useEffect(() => {
        console.log(certification)
    }, [certification]);

    return (
        <MDBContainer className="forget-password-page-input justify-content-center d-flex flex-column w-100">
            {(member_account === null) && <>
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
                        setMemberAccount(value.email);
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
            {(member_account !== null) && <>
                <h3>驗證碼已發送至{member_account}，請輸入驗證碼</h3>
                <MDBInput wrapperClass='mt-4 p-1 ' label='驗證碼' type='certification' name='certification' />
                <MDBBtn outline rounded className='mt-4 mb-1 p-3' onClick={
                    () => {
                        let certification_input = document.getElementsByName('certification')[0].value;
                        if (certification_input === certification) {
                            navigate('/reset_password', {
                                member_account: member_account
                            });
                        } else {
                            console.log('驗證碼錯誤');
                        }
                    }
                }> 驗證</MDBBtn>
                <MDBBtn rounded className='mt-4 mb-1 p-3' onClick={
                    () => {
                        const code = randomString(7);

                        sendEmailCertification({
                            'member_account': member_account,
                            'certification_code': code
                        });

                        setCertification(code);
                    }
                }> 重新發送驗證碼</MDBBtn>
            </>}
        </MDBContainer>
    );
}
export default VerifyCertification;
