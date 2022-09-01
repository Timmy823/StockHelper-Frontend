import React from 'react';
import { useNavigate } from "react-router";
import {
  MDBContainer,
  MDBInput,
  MDBBtn,
}
from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

const CodeVerification = () => {
    const navigate = useNavigate(); 
    return (
        <MDBContainer className="p-3 mt-5 d-flex flex-column w-100">
            <p>已經將驗證碼寄送至電子信箱dkfxxxxcmr@gmail.com</p>
            <MDBInput wrapperClass='my-5' label='輸入驗證碼' type='verification_code' name='verification_code'/>
            <MDBBtn className='w-100' onClick={
                () => {
                    if(document.getElementsByName('verification_code')[0].value === '123456') {
                        navigate('/reset_password');
                    }
                    else {
                        console.log("驗證碼錯誤");
                    }
                }
            }> 驗證 </MDBBtn>
        </MDBContainer>
    );
};
export default CodeVerification;
