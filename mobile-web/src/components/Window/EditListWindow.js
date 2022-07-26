import React, { useEffect, useState } from 'react';
import { accessApiPost } from '../../utils/AccessApiUtils';
import { domain, api_path } from '../../config/route';
import HintWindow from './HintWindow';
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBListGroup,
    MDBListGroupItem,
    MDBRow,
    MDBInput,
    MDBCol,
} from 'mdb-react-ui-kit';
import './Window.css'

const EditListWindow = ({ show, setShow, setFavoriteList, account, data }) => {
    const [list, setList] = useState([]);
    const [editing, setEditing] = useState({});
    const [hintWindow, setHintWindow] = useState(false);
    const [errorMessage, setErrorMessage] = useState();

    useEffect(() => {
        let list_array = [];

        data.map((element) => {
            list_array.push(element.list_name)
        });

        setList(list_array);
    }, [])

    useEffect(() => {
        let newEditing = {}

        list.map(element => newEditing[element] = false);

        setEditing(newEditing);
    }, [list])

    useEffect(() => {
    }, [editing])

    useEffect(() => {
    }, [hintWindow, errorMessage])

    const addList = async (favorite_list_name) => {
        const req_url = domain + api_path.list.add_favorite_list;
        const req_data = {
            'member_account': account,
            'favorite_list_name': favorite_list_name
        };

        accessApiPost(req_url, req_data, '無法新增我的最愛列表')
            .then((response) => {
                if (response.metadata.status === 'success') {
                    setList(prevState => ([
                        ...prevState,
                        favorite_list_name
                    ]));

                    setFavoriteList(prevState => ([
                        ...prevState,
                        {
                            'list_name': favorite_list_name,
                            "stock_list": []
                        }
                    ]));

                    document.getElementsByName('add-list-input')[0].value = "";
                }
            });
    };

    const editList = async (favorite_list_name, new_favorite_list_name) => {
        const req_url = domain + api_path.list.rename_favorite_list;
        const req_data = {
            'member_account': account,
            'favorite_list_name': favorite_list_name,
            'new_favorite_list_name': new_favorite_list_name
        };

        accessApiPost(req_url, req_data, '無法編輯我的最愛列表')
            .then((response) => {
                if (response.metadata.status === 'success') {
                    setFavoriteList(data.map((element) => {
                        if (element.list_name === favorite_list_name) {
                            element.list_name = new_favorite_list_name;
                        }

                        return element;
                    }));
                }

                setEditing(prevState => ({
                    ...prevState,
                    [favorite_list_name]: false
                }));
            });
    };

    const deleteList = async (favorite_list_name) => {
        const req_url = domain + api_path.list.delete_favorite_list;
        const req_data = {
            'member_account': account,
            'favorite_list_name': favorite_list_name
        };

        accessApiPost(req_url, req_data, '無法刪除我的最愛列表')
            .then((response) => {
                console.log(response)
                if (response.metadata.status === 'success') {
                    setFavoriteList(data.filter(item => item.list_name !== favorite_list_name));
                    setList(list.filter(item => item !== favorite_list_name));
                } else {
                    setHintWindow(true);
                    setErrorMessage('必須擁有一個列表');

                    setEditing(prevState => ({
                        ...prevState,
                        [favorite_list_name]: false
                    }));
                }
            });
    };

    return (
        <MDBModal staticBackdrop tabIndex='-1' className='edit-list-window' show={show}>
            <MDBModalDialog>
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle>編輯我的最愛列表</MDBModalTitle>
                        <MDBBtn className='btn-close' color='none' onClick={() => {
                            setShow(false);
                        }}></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody>
                        <MDBListGroup style={{ minWidth: '22rem' }} light>
                            {list.map((element, index) => (
                                <MDBListGroupItem tag='button' action noBorders type='button' className='d-flex justify-content-between' key={index} onClick={() => {
                                    let initial_editing = {};
                                    Object.keys(editing).map((e) => {
                                        initial_editing[e] = (e === element);
                                    });
                                    setEditing(initial_editing);
                                }}>
                                    {editing[element] &&
                                        <MDBRow>
                                            <MDBCol size='8'>
                                                <MDBInput name='edit-list-input' defaultValue={element} onChange={(e) => {
                                                    const target = document.getElementsByName('edit')[0];
                                                    target.disabled = (e.target.value.length === 0);
                                                }} />
                                            </MDBCol>
                                            <MDBBtn className='col-auto' name='edit' onClick={() => {
                                                const new_list_name = document.getElementsByName('edit-list-input')[0].value;
                                                editList(list[index], new_list_name);
                                            }}>確定</MDBBtn>
                                        </MDBRow> || element
                                    }
                                    <MDBBtn className='btn-close' color='none' onClick={() => {
                                        deleteList(element);
                                    }} disabled={editing[element]}></MDBBtn>
                                </MDBListGroupItem>
                            ))}
                        </MDBListGroup>
                        <MDBRow>
                            <MDBCol size='8'><MDBInput name='add-list-input' onChange={(e) => {
                                const target = document.getElementsByName('add-list')[0];
                                target.disabled = (e.target.value.length === 0);
                                if (e.target.value.length > 0) {
                                    target.onclick = () => {
                                        const new_list_name = document.getElementsByName('add-list-input')[0].value;
                                        addList(new_list_name);
                                    }
                                }
                            }} /></MDBCol>
                            <MDBBtn className='col-auto' name='add-list' disabled={true}>新增</MDBBtn>
                        </MDBRow>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color='success' onClick={() => {
                            setShow(false);
                        }}>完成</MDBBtn>
                    </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
            {
                hintWindow && 
                <HintWindow
                    show={hintWindow}
                    setShow={setHintWindow}
                    message={errorMessage}
                />
            }
        </MDBModal>
    );
};
export default EditListWindow;
