import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import {
    MDBContainer,
    MDBBtn
} from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { Dropdown } from 'react-bootstrap';
import { getAuthToken } from '../../utils/TokenUtils';
import './Stock.css'
import DividendCard from '../../components/Card/DividendCard';
import CompanyProfile from '../../components/Card/CompanyProfile';
import EPSCard from '../../components/Card/EPSCard';
import RevenueCard from '../../components/Card/Revenue';

const Stock = () => {
    const secretKey = "0123456789ASDFGH";
    const IV = CryptoJS.enc.Utf8.parse("1122334455");
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const login_token = 'account_info';

    const decrypt = (data) => {
        return JSON.parse(CryptoJS.AES.decrypt(
            CryptoJS.enc.Base64.stringify(CryptoJS.enc.Hex.parse(data)),
            CryptoJS.enc.Utf8.parse(secretKey),
            { iv: IV, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.ZeroPadding }
        ).toString(CryptoJS.enc.Utf8));
    };

    const [member, setMember] = useState("");
    const [favoriteList, setFavoriteList] = useState({});

    const [showItems, setShowItems] = useState({
        dividend: false,
        company_profile: false,
        eps: false,
        revenue: false,
    });
    const [stockTarget, setStockTarget] = useState({});
    const [dividendInfo, setDividendInfo] = useState([]);
    const [companyProfile, setCompanyProfile] = useState({});
    const [epsInfo, setEpsInfo] = useState([]);
    const [revenueInfo, setRevenueInfo] = useState([]);

    useEffect(() => {
        setShowItems({
            dividend: false,
            company_profile: false,
            eps: false,
            revenue: false,
        });

        setStockTarget(decrypt(searchParams.get("id")));
    }, [searchParams]);

    useEffect(() => {
        let member;
        if ((member = getAuthToken(login_token)) != null) {
            setMember(JSON.parse(member)["member_account"]);
            getFavoriteListDetail(JSON.parse(member)["member_account"]);
        }
    }, [stockTarget]);

    useEffect(() => {
        let all_false = Object.values(favoriteList).every(v => v === false);
        if (all_false) {
            document.getElementsByClassName('add-list')[0].firstChild.innerHTML = '+加入追蹤';
            document.getElementsByClassName('add-list')[0].firstChild.classList.add('btn-light');
            document.getElementsByClassName('add-list')[0].firstChild.classList.remove('btn-success');
        }

        if (!all_false) {
            document.getElementsByClassName('add-list')[0].firstChild.innerHTML = '已追蹤';
            document.getElementsByClassName('add-list')[0].firstChild.classList.remove('btn-light');
            document.getElementsByClassName('add-list')[0].firstChild.classList.add('btn-success');
        }
    }, [favoriteList]);

    useEffect(() => {
        if (dividendInfo.length !== 0) {
            setShowItems(prevState => ({
                ...prevState,
                dividend: true,
            }));
        }
    }, [dividendInfo]);

    useEffect(() => {
        if (dividendInfo.length !== 0) {
            setShowItems(prevState => ({
                ...prevState,
                dividend: true,
            }));
        }
    }, [dividendInfo]);

    useEffect(() => {
        if (Object.keys(companyProfile).length !== 0) {
            setShowItems(prevState => ({
                ...prevState,
                company_profile: true,
            }));
        }
    }, [companyProfile]);

    useEffect(() => {
        if (epsInfo.length !== 0) {
            setShowItems(prevState => ({
                ...prevState,
                eps: true,
            }));
        }
    }, [epsInfo]);

    useEffect(() => {
        if (revenueInfo.length !== 0) {
            setShowItems(prevState => ({
                ...prevState,
                revenue: true,
            }));
        }
    }, [revenueInfo]);

    const accessAPI = async (method, req_url, req_data, error_message) => {
        let request;
        if (method === 'GET') {
            req_url += '?';
            Object.keys(req_data).map((key) => {
                req_url += key + "=" + req_data[key];
            });

            request = await fetch(req_url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                }
            });
        } else {
            request = await fetch(req_url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(req_data)
            });
        }

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
            'makeup_probability': (makeup * 100 / result.length).toFixed(2),
            'makeup_avg_day': (makeup_day / result.length).toFixed(2),
            'decade_avg_cash_dividend': (decade_cash_dividend / 10).toFixed(2)
        };
    };

    const getFavoriteListDetail = (member_account) => {
        const req_data = {
            'member_account': member_account
        };

        accessAPI('GET', 'http://localhost:5277/member/getFavoriteList', req_data, '無法取得會員我的最愛')
            .then((response) => {
                let result = {};
                response['data'].map((list) => {
                    result[list['list_name']] = false;
                    list['stock_list'].map((stock) => {
                        if (stock['stock_id'] === stockTarget['stock_id']) {
                            result[list['list_name']] = true;
                            return;
                        }
                    });
                });

                setFavoriteList(result);
            });
    }

    const addFavoriteListStock = (request) => {
        const req_data = {
            'member_account': request['member_account'],
            'favorite_list_name': request['list_name'],
            'stock_id': request['stock_id'],
            'stock_name': request['stock_name']
        };

        accessAPI('POST', 'http://localhost:5277/member/addFavoriteListStock', req_data, '無法新增股票至我的最愛 ' + request['favorite_list_name'])
            .then((response) => {
                console.log(response);
                if (response['metadata']['status'] === 'success') {
                    setFavoriteList(prevState => ({
                        ...prevState,
                        [request['list_name']]: true,
                    }));
                }
            });
    }

    const deleteFavoriteListStock = (request) => {
        const req_data = {
            'member_account': request['member_account'],
            'favorite_list_name': request['list_name'],
            'stock_id': request['stock_id'],
        };

        accessAPI('POST', 'http://localhost:5277/member/deleteFavoriteListStock', req_data, '無法刪除我的最愛股票 ' + request['favorite_list_name'])
            .then((response) => {
                console.log(response);
                if (response['metadata']['status'] === 'success') {
                    setFavoriteList(prevState => ({
                        ...prevState,
                        [request['list_name']]: false,
                    }));
                }
            });
    }

    const getDividendInfo = (stock_id) => {
        const req_data = {
            'stock_id': stock_id
        };

        accessAPI('GET', 'http://localhost:5277/twse/getCompanyDividendPolicy', req_data, '無法取得股利政策')
            .then((response) => {
                console.log(response);
                let result = response['data'].map((data) => {
                    let time = data['period'] == 'FY'? data['year'] : data['year'] + "/" + data['period']
                    return {
                        time: time,
                        value: data['cash_dividend'],
                        make_up_dividend_days: data['make_up_dividend_days']
                    };
                });

                result = result.slice(0,15)

                result = result.sort(function (a, b) {
                    return a.time.split('/')[0] > b.time.split('/')[0] ? 1 : -1;
                });

                const dividendOverviewInfo = getDividendOverviewInfo(result);

                setDividendInfo([{
                    'overview': dividendOverviewInfo,
                    'data': result
                }]);
            });
    };

    const getCompanyProfile = (stock_id) => {
        const req_data = {
            'stock_id': stock_id
        };

        accessAPI('GET', 'http://localhost:5277/twse/getCompanyProfile', req_data, '無法取得公司基本資料')
            .then((response) => {
                let result = {
                    'overview': {
                        'chairman': response['data']['chairman'],
                        'president': response['data']['president'],
                        'created_date': response['data']['created_date'],
                        'stock_date': response['data']['stock_date'],
                    },
                    'contact': {
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
            .then((response) => {
                let result = response['data'].map((data) => {
                    return {
                        time: data['year'] + data['season'],
                        value: data['eps']
                    };
                });

                result = result.sort(function (a, b) {
                    return a.time > b.time ? 1 : -1;
                });

                setEpsInfo([{
                    'data': result
                }]);
            });
    };

    const getMonthlyRevenue = (stock_id) => {
        const req_data = {
            'stock_id': stock_id
        };

        accessAPI('GET', 'http://localhost:5277/twse/getCompanyMonthlyRevenue', req_data, '無法取得公司營收')
            .then((response) => {
                let result = response['data'].map((data) => {
                    let time = data['year'] + '/' + data['month'];
                    return {
                        time: time,
                        value: (data['revenue'] / 1000000000).toFixed(2)
                    };
                });

                result = result.sort(function (a, b) {
                    return a.time > b.time ? 1 : -1;
                });

                setRevenueInfo([{
                    'data': result
                }]);
            });
    };

    return (
        <MDBContainer className='mt-3 stock_mainpage'>
            <div className='row'>
                <Dropdown className="col-4 add-list" autoClose="outside">
                    <Dropdown.Toggle id="dropdown-autoclose-outside" onClick={() => {
                        if (member === "") {
                            navigate('/login', {
                                state: '/stock?id=' + searchParams.get("id")
                            });
                        }
                    }}>
                        +加入追蹤
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {
                            Object.keys(favoriteList).map((list_name, index) => {
                                return (
                                    <Dropdown.Item as='div' key={index}>
                                        <input className="form-check-input" type="checkbox" id={'list_' + index} name={list_name} onChange={(e) => {
                                            setFavoriteList(prevState => ({
                                                ...prevState,
                                                [e.target.name]: e.target.checked,
                                            }));

                                            if (e.target.checked) {
                                                addFavoriteListStock({
                                                    'member_account': member,
                                                    'list_name': e.target.name,
                                                    'stock_id': stockTarget['stock_id'],
                                                    'stock_name': stockTarget['stock_name']
                                                });
                                            } else {
                                                deleteFavoriteListStock({
                                                    'member_account': member,
                                                    'list_name': e.target.name,
                                                    'stock_id': stockTarget['stock_id']
                                                });
                                            }
                                        }}
                                            checked={favoriteList[list_name]} />
                                        <label className="form-check-label" htmlFor={'list_' + index}>{list_name}</label>
                                    </Dropdown.Item>
                                );
                            })
                        }
                    </Dropdown.Menu>
                </Dropdown>
                <div className='col-8 stock-info'>
                    <h5 className='mb-1'> {stockTarget['stock_name']} </h5>
                    <p className='mb-1'> {stockTarget['stock_id']}  {stockTarget['stock_type']}</p>
                </div>
            </div>
            <div className='mb-3 menu'>
                <MDBBtn className='mx-2 px-3 stock-menu-button' onClick={() => {
                    getDividendInfo(stockTarget['stock_id']);
                }}>股利政策</MDBBtn>
                <MDBBtn className='mx-2 px-3 stock-menu-button' onClick={() => {
                    getCompanyProfile(stockTarget['stock_id']);
                }}>公司基本資訊</MDBBtn>
                <MDBBtn className='mx-2 px-3 stock-menu-button' onClick={() => {
                    getEps(stockTarget['stock_id']);
                }}>eps</MDBBtn>
                <MDBBtn className='mx-2 px-3 stock-menu-button' onClick={() => {
                    getMonthlyRevenue(stockTarget['stock_id']);
                }}>營收</MDBBtn>
            </div>
            <div className='mb-3 content'>
                <div className={'sub-content mb-2' + (showItems['dividend'] ? '' : ' hidden')}>
                    {showItems['dividend'] && <DividendCard input_data={dividendInfo} />}
                </div>
                <div className={'sub-content mb-2' + (showItems['company_profile'] ? '' : ' hidden')}>
                    {showItems['company_profile'] && <CompanyProfile input_data={companyProfile} />}
                </div>
                <div className={'sub-content mb-2' + (showItems['eps'] ? '' : ' hidden')}>
                    {showItems['eps'] && <EPSCard input_data={epsInfo} />}
                </div>
                <div className={'sub-content mb-2' + (showItems['revenue'] ? '' : ' hidden')}>
                    {showItems['revenue'] && <RevenueCard input_data={revenueInfo} />}
                </div>
            </div>
        </MDBContainer>
    );
}
export default Stock;
