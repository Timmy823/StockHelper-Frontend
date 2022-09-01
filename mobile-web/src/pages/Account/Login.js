import React from 'react';
import { useNavigate } from 'react-router-dom';
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
            <MDBInput wrapperClass='mt-4' label='電子信箱' id='form1' name='account'/>
            <MDBInput wrapperClass='mt-4' label='密碼' id='form2' name='password'/>

            <div className="d-flex justify-content-between mx-3 my-2">
                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='記住帳號密碼' />
                <a href="!#">忘記密碼?</a>
            </div>

            <div className='login-message hidden'> 註冊成功 </div>

            <MDBBtn className="mb-4" onClick={() => {
                let member_account = document.getElementsByName('account')[0].value;
                let password = document.getElementsByName('password')[0].value;
                Login({
                    "member_account": member_account,
                    "password": password
                }, (response) => {
                    console.log(response);
                    if(response.metadata.status === 'success') 
                        navigate('/account');

                    document.getElementsByClassName('login-message')[0].innerHTML = response.metadata.desc;
                    document.getElementsByClassName('login-message')[0].classList.remove("hidden");
                    document.getElementsByClassName('login-message')[0].classList.add("active");
                });

            }}>登入</MDBBtn>

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
