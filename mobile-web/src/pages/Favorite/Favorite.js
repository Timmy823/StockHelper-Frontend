import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthToken } from '../../utils/TokenUtils';
import ListInstantStock from "../../components/Card/ListInstantStock";
import EditListWindow from '../../components/Window/EditListWindow';
import "./Favorite.css";
import { MDBBtn, MDBContainer, MDBNavbar, MDBNavbarItem, MDBIcon } from 'mdb-react-ui-kit';

const Favorite = () => {
    const navigate = useNavigate();
    const [account, setAccount] = useState();
    const [editingShow, setEditingShow] = useState(false);
    const login_token = 'account_info';

    const [FavoriteList, setFavoriteList] = useState([{
        "list_name": "",
        "stock_list": [
            {
                "stock_id": "0000",
                "stock_name": "",
                "comment": ""
            }
        ]
    }]);

    const [ButtonIndex, setButtonIndex] = useState(0);
    let initialClass = 0;

    const getFavoriteListInfo = async (account) => {
        const req_url = "http://localhost:5277/member/getFavoriteList" + "?member_account=" + account;
        const request = await fetch(req_url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        let response = await request.json();
        if (request.status === 200) {
            return response;
        } else {
            return {
                "metadata": {
                    "status": "error",
                    "desc": "取得列表失敗"
                },
                "data": []
            };
        }
    };

    useEffect(() => {
        if (getAuthToken(login_token) === null) {
            navigate('/login', {
                state: '/favorite'
            });
        } else {
            setAccount(JSON.parse(getAuthToken(login_token))['member_account']);
            getFavoriteListInfo(JSON.parse(getAuthToken(login_token))['member_account'])
                .then((response) => {
                    setFavoriteList(response.data);
                })
        }
    }, []);

    useEffect(()=>{
        console.log(FavoriteList);
    },[FavoriteList])

    return (
        <MDBContainer className='favorite-page'>
            <MDBNavbar className='option-button-list'>
                {FavoriteList.map((list, index) => {
                    initialClass = (index == 0) ? 'option-button selected' : 'option-button';
                    return <MDBNavbarItem className={initialClass}
                        key={index}
                        id={index}
                        onClick={(e) => {
                            setButtonIndex(e.target.id);
                            FavoriteList.map((list, index) => {
                                if (document.getElementsByClassName('option-button')[index].classList.contains("selected"))
                                    document.getElementsByClassName('option-button')[index].classList.remove("selected");
                            })
                            document.getElementsByClassName('option-button')[e.target.id].classList.add("selected");
                        }}
                    >{list.list_name}</MDBNavbarItem>;
                })}
            </MDBNavbar>
            <div className='stock-list'>
                {FavoriteList[ButtonIndex]['stock_list'].map((stock, index) => {
                    if (stock.stock_id == '0000')
                        return;
                    return <><ListInstantStock className={'stockid_' + stock.stock_id} key={index} input_data={{
                        'stock_name': stock.stock_name,
                        'stock_id': stock.stock_id,
                        'stock_type': ' ',
                        'stock_value': '203.00',
                        'stock_value_offset': '-1.23%'
                    }} /><hr /></>;
                })}
            </div>
            <MDBBtn floating color='warning' className='mx-1' title='編輯列表' style={{ color: '#fff' }} onClick={()=>{
                setEditingShow(true);
            }}>
                <MDBIcon far icon="edit" size='lg'/> 編輯列表
            </MDBBtn>
            {editingShow &&
                <EditListWindow /** 編輯視窗 */
                    show={editingShow}
                    setShow={setEditingShow}
                    setFavoriteList={setFavoriteList}
                    account={account}
                    data={FavoriteList}
                />}
        </MDBContainer>
    );
}
export default Favorite;
