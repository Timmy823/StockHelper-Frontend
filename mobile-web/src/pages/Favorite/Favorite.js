import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthToken } from '../../utils/TokenUtils';
import ListInstantStock from "../../components/Card/ListInstantStock";
import "./Favorite.css";

const Favorite = () => {
    const navigate = useNavigate();
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

    useEffect(()=>{
        if (getAuthToken(login_token) === null)
            navigate('/login');
        getFavoriteListInfo(JSON.parse(getAuthToken(login_token))['member_account'])
        .then((response)=>{
            setFavoriteList(response.data);
        })
    },[]);

    return (
        <div>
            <div className='favorite-page'>
                <div className='option-button-list'>
                    {FavoriteList.map((list, index) => { 
                        console.log(index);
                        return <li className='option-button'
                            key={index}
                            id={index}
                            onClick={(e)=> {
                                setButtonIndex(e.target.id);
                            }}
                        >{list.list_name}</li>;
                    })}
                </div>
                <div className='stock-list'>
                    {FavoriteList[ButtonIndex]['stock_list'].map((stock, index) => {
                        if (stock.stock_id == '0000') 
                            return;
                        return <><ListInstantStock className={'stockid_' + stock.stock_id} key={index}/><hr/></>;
                    })}
                </div>
            </div>
        </div>
    );
}
export default Favorite;
