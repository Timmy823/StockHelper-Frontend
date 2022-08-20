import React from 'react';
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
    return (
        <MDBContainer className="p-3 mt-1 d-flex flex-column w-100">
            <h3>登入</h3>
            <MDBInput wrapperClass='mt-4' label='電子信箱' id='form1' type='email'/>
            <MDBInput wrapperClass='mt-4' label='密碼' id='form2' type='password'/>

            <div className="d-flex justify-content-between mx-3 my-2">
                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='記住帳號密碼' />
                <a href="!#">忘記密碼?</a>
            </div>

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
