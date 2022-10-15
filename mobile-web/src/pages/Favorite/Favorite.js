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

    const [FavoriteList, setFavoriteList] = useState([]);
    const [ListStockItem, setListStockItem] = useState({});
    
    const [ButtonIndex, setButtonIndex] = useState(0);

    const getFavoriteListInfo = async (account) => {
        const req_url = "http://localhost:5277/member/getFavoriteList?member_account=" + account;
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

    const getRecentStockClosingPrice = async (stock_id, error_message) => {
        let request = await fetch('http://localhost:5277/twse/getStockTradeInfo?stock_id=' + stock_id, {
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
                    "desc": error_message
                },
                "data": {}
            };
        }
    }

    const getLastClosingPrice = (trend_data) => {
        if (trend_data === undefined) {
            return -1;
        }

        return trend_data[trend_data.length - 1].value;
    }

    const getStcokOffset = (trend_data) => {
        if (trend_data === undefined) {
            return '0%';
        }

        return (100*(trend_data[trend_data.length - 1].value - trend_data[0].value)/trend_data[0].value).toFixed(2) + '%';
    }

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
        FavoriteList.map((list_data)=>{
            list_data.stock_list.map((stock)=>{
                if (!(stock.stock_id in ListStockItem)) {
                    getRecentStockClosingPrice(stock.stock_id, "無法取得收盤價")
                        .then((response)=>{
                            if (response.metadata.status === 'success') {
                                let result = response.data.map((data)=>{
                                    return {
                                        'time': data.date.substring(0,4) + '-' + data.date.substring(4,6) + '-' + data.date.substring(6,8),
                                        'value': Number(data.closing_price)
                                    };
                                });

                                setListStockItem(prevState => ({
                                    ...prevState,
                                    [stock.stock_id] : <><ListInstantStock 
                                        className={'stockid_' + stock.stock_id}
                                        key={stock.stock_id}
                                        stock={{
                                            'stock_name': stock.stock_name,
                                            'stock_id': stock.stock_id,
                                            'stock_type': ' ',
                                            'stock_value': getLastClosingPrice(result),
                                            'stock_value_offset': getStcokOffset(result)
                                        }}
                                        trend_data={[{
                                            'name': 'index',
                                            'data': result
                                        }]}
                                    /><hr /></>
                                }));
                            }
                        });
                }
            });
        });
    },[FavoriteList]);

    return (
        <MDBContainer className='favorite-page'>
            <MDBNavbar className='option-button-list'>
                {FavoriteList.map((list, index) => {
                    return <MDBNavbarItem className={ 'option-button ' + (((index === 0)&&'selected') || '') }
                        key={index}
                        id={index}
                        onClick={(e) => {
                            setButtonIndex(Number(e.target.id));
                            FavoriteList.map((list, index) => {
                                if (document.getElementsByClassName('option-button')[index].classList.contains("selected"))
                                    document.getElementsByClassName('option-button')[index].classList.remove("selected");
                                return;
                            })
                            document.getElementsByClassName('option-button')[e.target.id].classList.add("selected");
                        }}
                    >{list.list_name}</MDBNavbarItem>;
                })}
            </MDBNavbar>
            <div className='stock-list'>
                {
                    FavoriteList.length > 0 &&
                    FavoriteList.map((element, index)=>{
                        return element.stock_list.map((stock)=>{
                            return (ButtonIndex === index)&&ListStockItem[stock.stock_id];
                        })
                    })
                }
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
