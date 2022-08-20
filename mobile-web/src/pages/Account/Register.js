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

const Register = () => {
    return (
        <MDBContainer className="p-3 mt-1 mb-6 d-flex flex-column w-100">
            <h3>註冊</h3>
            <MDBInput wrapperClass='mt-4' label='電子郵件' id='form1' type='email'/>
            <MDBInput wrapperClass='mt-4' label='密碼' id='form2' type='password'/>
            <MDBInput wrapperClass='mt-4' label='密碼再次確認' id='form3' type='password'/>
            <MDBInput wrapperClass='mt-4' label='名稱' id='form4' type='name'/>
            <MDBInput wrapperClass='mt-4' label='手機號碼' id='form5' type='telphone'/>

            <div className='d-flex justify-content-center mt-1 mb-1'>
                <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I have read and agree to the terms' />
            </div>

            <div className='d-flex w-100'>
                <MDBBtn className="mb-2 mx-2 w-50">送出</MDBBtn>
                <MDBBtn tag='a' href='/login' className="btn-light mb-2 mx-2 w-50">取消</MDBBtn>
            </div> 
            
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
