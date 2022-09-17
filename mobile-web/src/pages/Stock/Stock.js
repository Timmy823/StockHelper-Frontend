import React, { useEffect, useState } from 'react';
import {
    MDBContainer,
    MDBBtn
}
from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import './Stock.css'
import DividendCard from '../../components/Card/DividendCard';

const Stock = () => {
    const [showItems, setShowItems] = useState({
        dividend: false,
        company_profile: false
    });
    const [dividendInfo, setDividendInfo] = useState([]);
    useEffect(()=>{
        if(dividendInfo.length !== 0) {
            setShowItems(prevState => ({
                ...prevState,
                dividend: true,
            }));
        }
    }, [dividendInfo]);

    const accessAPI = async (method, req_url, req_data, error_message) => {
        if (method === 'GET') {
            req_url += '?';
            Object.keys(req_data).map((key) => {
                req_url += key + "=" +req_data[key];
            });
        }

        const request = await fetch(req_url, {
            method: method,
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
    };

    const getDividendOverviewInfo = (result) => {
        let makeup = 0.0, makeup_day = 0.0, decade_cash_dividend = 0.0;
        result.forEach((element, index) => {
            if (!isNaN(element['make_up_dividend_days']) && Number(element['make_up_dividend_days']) <= 365) {
                makeup += 1;
                makeup_day += Number(element['make_up_dividend_days']);
            }
            if (index < 10 && !isNaN(element['value']))
                decade_cash_dividend += Number(element['value']);
        });

        return {
            'makeup_probability': (makeup*100/result.length).toFixed(2), 
            'makeup_avg_day': (makeup_day/result.length).toFixed(2), 
            'decade_avg_cash_dividend': (decade_cash_dividend/10).toFixed(2)
        };
    };

    const getDividendInfo = (stock_id) => {
        const req_data = {
            'stock_id': stock_id
        };

        accessAPI('GET', 'http://localhost:5277/twse/getCompanyDividendPolicy', req_data, '無法取得股利政策')
            .then((respone)=>{
                let result = respone['data'].map((data)=>{
                    return {
                        time: data['dividend_period'],
                        value: data['cash_dividend(dollors)'],
                        make_up_dividend_days: data['make_up_dividend_days']
                    };
                });

                result = result.filter((element)=>{
                    return Number(element['time']) >= 2007;
                });

                const dividendOverviewInfo = getDividendOverviewInfo(result);
                result = result.sort(function (a, b) {
                    return a.time > b.time ? 1 : -1;
                });

                setDividendInfo([{
                    'overview': dividendOverviewInfo,
                    'data' : result
                }]);
            });
    };

    const getCompanyProfile = (stock_id) => {
        const req_data = {
            'stock_id': stock_id
        };
        accessAPI('GET', 'http://localhost:5277/member/getCompanyProfile', req_data, '無法取得公司基本資料');
    };

    return (
        <MDBContainer className='mt-3 stock_mainpage'>
            <div className='quote'>
                <h5> 中興電</h5>
                <h6> 1513 </h6>
            </div>
            <div className='mb-3 menu'>
                <MDBBtn className='mx-2 px-3 stock-menu-button' onClick={()=>{
                    getDividendInfo('1513');
                }}>股利政策</MDBBtn>
                <MDBBtn className='mx-2 px-3 stock-menu-button'>公司基本資訊</MDBBtn>
            </div>
            <div className='mb-3 content'>
                <div className={'sub-content mb-2' + (showItems['dividend'] ? '' : 'hidden')}>
                    {
                        showItems['dividend'] ? <DividendCard input_data={dividendInfo}/> : <p></p>
                    }
                </div>
                <div className={'sub-content mb-2' + (showItems['company_profile'] ? '' : 'hidden')}>
                </div>
            </div>
        </MDBContainer>
    );
}
export default Stock;
