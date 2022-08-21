import React, { useState } from 'react';
import { MDBCollapse, MDBBtn, MDBRow, MDBCol} from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import './Account.css';

const Account = () => {
    const [showAccountInfo, setShowAccountInfo] = useState(false);
    const [showRemider, setShowRemider] = useState(false);
    const [showManul, setShowManual] = useState(false);

    const toggleAccountInfo = () => setShowAccountInfo(!showAccountInfo);
    const toggleRemider = () => setShowRemider(!showRemider);
    const toggleManual = () => setShowManual(!showManul);

    return (
        <>
            <MDBBtn className='btn-dark w-100 mt-5' onClick={toggleAccountInfo}> 個人資訊</MDBBtn>
            
            <MDBCollapse show={showAccountInfo} className='my-1 mx-2'>
                <MDBRow className='my-2'>
                    <MDBCol className='row-auto col-auto me-auto'>名稱：</MDBCol>
                    <MDBCol className='row-auto col-auto'> 韭菜</MDBCol>
                    <MDBBtn className='col-auto px-3 py-0' color='link' data-mdb-ripple-color='dark'> 變更</MDBBtn>
                </MDBRow>
                <MDBRow className='my-2'>
                    <MDBCol className='col-auto me-auto'>電子信箱：</MDBCol>
                    <MDBCol className='col-auto'> sodklkeolc@gmail.com</MDBCol>
                    <MDBBtn className='col-auto px-3 py-0' color='link' data-mdb-ripple-color='dark'> 變更</MDBBtn>
                </MDBRow>
                <MDBRow className='my-2'>
                    <MDBCol className='col-auto me-auto'>密碼：</MDBCol>
                    <MDBBtn className='col-auto px-3 py-0' color='link' data-mdb-ripple-color='dark'> 變更</MDBBtn>
                </MDBRow>
                <MDBRow className='my-2'>
                    <MDBCol className='col-auto me-auto'>聯絡電話：</MDBCol>
                    <MDBCol className='col-auto'> 0954875487</MDBCol>
                    <MDBBtn className='col-auto px-3 py-0' color='link' data-mdb-ripple-color='dark'> 變更</MDBBtn>
                </MDBRow>
            </MDBCollapse>

            <MDBBtn className='btn-dark w-100' onClick={toggleRemider}> 報價提醒</MDBBtn>


            <MDBBtn className='btn-dark w-100' onClick={toggleManual}> 使用教學</MDBBtn>
            <MDBCollapse show={showManul} className='mt-1'>
                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil
                anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
            </MDBCollapse>

            <MDBBtn className='btn-dark w-100' href='/login'> 登出</MDBBtn>
        </>
    );
}
export default Account;
