import React from 'react';
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter
} from 'mdb-react-ui-kit';

const HintWindow = ({ show, setShow, message }) => {
    return (
        <MDBModal staticBackdrop tabIndex='-1' className='mx-auto hint-window' show={show}>
            <MDBModalDialog>
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle> 錯誤 </MDBModalTitle>
                        <MDBBtn className='btn-close' color='none' onClick={() => {
                            setShow(false);
                        }}></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody>
                        <p>{message}</p>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn classNam='' color='danger' onClick={() => {
                            setShow(false);
                        }}>確定</MDBBtn> 
                    </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    );
};
export default HintWindow;
