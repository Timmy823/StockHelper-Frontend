import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import {
    MDBContainer,
    MDBBtn
}
from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import './Stock.css'
import DividendCard from '../../components/Card/DividendCard';
import CompanyProfile from '../../components/Card/CompanyProfile';
import EPSCard from '../../components/Card/EPSCard';
import RevenueCard from '../../components/Card/Revenue';

const Stock = () => {
    const secretKey = "0123456789ASDFGH";
    const IV = CryptoJS.enc.Utf8.parse("1122334455");
    const [searchParams, setSearchParams] = useSearchParams();

    const decrypt = (data) => {
        return JSON.parse(CryptoJS.AES.decrypt(
            CryptoJS.enc.Base64.stringify(CryptoJS.enc.Hex.parse(data)),
            CryptoJS.enc.Utf8.parse(secretKey),
            {iv: IV, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.ZeroPadding}
        ).toString(CryptoJS.enc.Utf8));
    };

    const [showItems, setShowItems] = useState({
        dividend: false,
        company_profile: false,
        eps: false,
        revenue: false,
    });
    const [dividendInfo, setDividendInfo] = useState([]);
    const [companyProfile, setCompanyProfile] = useState({});
    const [epsInfo, setEpsInfo] = useState([]);
    const [revenueInfo, setRevenueInfo] = useState([]);

    useEffect(()=>{
        if(dividendInfo.length !== 0) {
            setShowItems(prevState => ({
                ...prevState,
                dividend: true,
            }));
        }
    }, [dividendInfo]);

    useEffect(()=>{
        if(Object.keys(companyProfile).length !== 0) {
            setShowItems(prevState => ({
                ...prevState,
                company_profile: true,
            }));
        }
    }, [companyProfile]);

    useEffect(()=>{
        if(epsInfo.length !== 0) {
            setShowItems(prevState => ({
                ...prevState,
                eps: true,
            }));
        }
    }, [epsInfo]);

    useEffect(()=>{
        if(revenueInfo.length !== 0) {
            setShowItems(prevState => ({
                ...prevState,
                revenue: true,
            }));
        }
    }, [revenueInfo]);

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
            .then((response)=>{
                let result = response['data'].map((data)=>{
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

        accessAPI('GET', 'http://localhost:5277/twse/getCompanyProfile', req_data, '無法取得公司基本資料')
            .then((response)=>{
                console.log(response);
                let result = {
                    'overview':{
                        'chairman': response['data']['chairman'],
                        'president': response['data']['president'],
                        'created_date': response['data']['created_date'],
                        'stock_date': response['data']['stock_date'],
                    },
                    'contact':{
                        'website': response['data']['website'],
                        'address': response['data']['address'],
                        'email': response['data']['email'],
                        'telephone': response['data']['telephone'],
                        'fax': response['data']['fax'],
                    },
                    'main_business': response['data']['main_business'],
                    'market': {
                        'share_capital': response['data']['share_capital'],
                        'market_value': response['data']['market_value'],
                        'share_holding_radio': response['data']['share_holding_radio'],
                    },
                };

                setCompanyProfile(result);
            });
    };

    const getEps = (stock_id) => {
        const req_data = {
            'stock_id': stock_id
        };

        accessAPI('GET', 'http://localhost:5277/twse/getStockEps', req_data, '無法取得公司EPS')
            .then((response)=>{
                let result = response['data'].map((data)=>{
                    return {
                        time: data['year'] + data['season'],
                        value: data['eps']
                    };
                });

                result = result.sort(function (a, b) {
                    return a.time > b.time ? 1 : -1;
                });

                setEpsInfo([{
                    'data' : result
                }]);
            });
    };

    const getMonthlyRevenue = (stock_id) => {
        const req_data = {
            'stock_id': stock_id
        };

        accessAPI('GET', 'http://localhost:5277/twse/getCompanyMonthlyRevenue', req_data, '無法取得公司營收')
            .then((response)=>{
                let result = response['data'].map((data)=>{
                    let time = data['year'] + '/' + data['month'];
                    return {
                        time: time,
                        value: (data['revenue'] / 1000000000).toFixed(2)
                    };
                });

                result = result.sort(function (a, b) {
                    return a.time > b.time ? 1 : -1;
                });

                console.log(result);

                setRevenueInfo([{
                    'data' : result
                }]);
            });
    };

    return (
        <MDBContainer className='mt-3 stock_mainpage'>
            <div className='overview'>
                <h5 className='mb-1'> {decrypt(searchParams.get("id"))['stock_name']} </h5>
                <p className='mb-1'> {decrypt(searchParams.get("id"))['stock_id']}  {decrypt(searchParams.get("id"))['stock_type']}/{decrypt(searchParams.get("id"))['industry_type']}</p>
            </div>
            <div className='mb-3 menu'>
                <MDBBtn className='mx-2 px-3 stock-menu-button' onClick={()=>{
                    getDividendInfo('1513');
                }}>股利政策</MDBBtn>
                <MDBBtn className='mx-2 px-3 stock-menu-button' onClick={()=>{
                    getCompanyProfile('1513');
                }}>公司基本資訊</MDBBtn>
                <MDBBtn className='mx-2 px-3 stock-menu-button' onClick={()=>{
                    getEps('1513');
                }}>eps</MDBBtn>
                <MDBBtn className='mx-2 px-3 stock-menu-button' onClick={()=>{
                    getMonthlyRevenue('1513');
                }}>營收</MDBBtn>
            </div>
            <div className='mb-3 content'>
                <div className={'sub-content mb-2' + (showItems['dividend'] ? '' : ' hidden')}>
                    {
                        showItems['dividend'] ? <DividendCard input_data={dividendInfo}/> : <p></p>
                    }
                </div>
                <div className={'sub-content mb-2' + (showItems['company_profile'] ? '' : ' hidden')}>
                    {
                        showItems['company_profile'] ? <CompanyProfile input_data={companyProfile}/> : <p></p>
                    }
                </div>
                <div className={'sub-content mb-2' + (showItems['eps'] ? '' : ' hidden')}>
                    {
                        showItems['eps'] ? <EPSCard input_data={epsInfo}/> : <p></p>
                    }
                </div>
                <div className={'sub-content mb-2' + (showItems['revenue'] ? '' : ' hidden')}>
                    {
                        showItems['revenue'] ? <RevenueCard input_data={revenueInfo}/> : <p></p>
                    }
                </div>
            </div>
        </MDBContainer>
    );
}
export default Stock;
