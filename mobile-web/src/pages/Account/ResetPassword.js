import React from 'react';
import { useNavigate } from "react-router";
import {
  MDBContainer,
  MDBInput,
  MDBBtn,
}
from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

const ResetPassword = () => {
    const navigate = useNavigate();
    return (
        <MDBContainer className="p-3 mt-5 d-flex flex-column w-100">
            <h3>重設密碼</h3>
            <MDBInput wrapperClass='mt-5' label='輸入新密碼' type='new_password' name='new_password'/>
            <MDBInput wrapperClass='my-4' label='密碼再次確認' type='new_password_confirm' name='new_password_confirm'/>

            <MDBBtn className='mt-5 mb-1 w-100' onClick={
                () => {
                    let password = document.getElementsByName('new_password')[0].value;
                    let confirm = document.getElementsByName('new_password_confirm')[0].value;
                    if (password === confirm) {
                        navigate('/login');
                    }
                    else {
                        console.log("密碼輸入不一致");
                    }
                }
            }> 送出 </MDBBtn>
            <MDBBtn className='btn-outline-info mt-3 w-100' color='link' data-mdb-ripple-color="dark" onClick={
                () => {
                    navigate('/login');
                }
            }> 取消 </MDBBtn>
        </MDBContainer>
    );
};
export default ResetPassword;
