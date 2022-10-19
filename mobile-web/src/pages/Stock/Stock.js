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
import { accessApiGet, accessApiPost } from '../../utils/AccessApiUtils';
import { domain, api_path } from '../../config/route';
import './Stock.css'
import DividendCard from '../../components/Card/DividendCard';
import CompanyProfile from '../../components/Card/CompanyProfile';
import EPSCard from '../../components/Card/EPSCard';
import RevenueCard from '../../components/Card/RevenueCard';

const Stock = ({ onLoad }) => {
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
    const [dividendInfo, setDividendInfo] = useState({});
    const [companyProfile, setCompanyProfile] = useState({});
    const [epsInfo, setEpsInfo] = useState([]);
    const [revenueInfo, setRevenueInfo] = useState([]);

    useEffect(() => {
        onLoad(false);

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
        if (Object.keys(favoriteList).length > 0)
            onLoad(true);

        let all_false = Object.values(favoriteList).every(v => v === false);

        const target = document.getElementsByClassName('add-list')[0].firstChild;

        if (all_false) {
            target.innerHTML = '+加入追蹤';
            target.classList.add('btn-light');
            target.classList.remove('btn-success');
        } else {
            target.innerHTML = '已追蹤';
            target.classList.remove('btn-light');
            target.classList.add('btn-success');
        }
    }, [favoriteList]);

    useEffect(() => {
        if (Object.keys(dividendInfo).length !== 0) {
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

    const getDividendOverviewInfo = (result) => {
        let makeup = 0.0, makeup_day = 0.0, decade_cash_dividend = 0.0;
        result.forEach((element, index) => {
            if (!isNaN(element['make_up_dividend_days']) && Number(element['make_up_dividend_days']) <= 365) {
                makeup += 1;
                makeup_day += Number(element['make_up_dividend_days']);
            }
            if (index < 10 && !isNaN(element['cash']))
                decade_cash_dividend += Number(element['cash']);

            delete element['make_up_dividend_days'];
        });

        return {
            'makeup_probability': (makeup * 100 / result.length).toFixed(2),
            'makeup_avg_day': (makeup_day / result.length).toFixed(2),
            'decade_avg_cash_dividend': (decade_cash_dividend / 10).toFixed(2)
        };
    };

    const getFavoriteListDetail = (member_account) => {
        const req_url = domain + api_path.member.get_favorite_list;
        const req_data = {
            'member_account': member_account
        };

        accessApiGet(req_url, req_data, '無法取得會員我的最愛')
            .then((response) => {
                if (response.metadata.status === 'success') {
                    let result = {};
                    response.data.map((list) => {
                        result[list['list_name']] = false;
                        list.stock_list.map((stock) => {
                            if (stock['stock_id'] === stockTarget['stock_id']) {
                                result[list['list_name']] = true;
                                return;
                            }
                        });
                    });

                    setFavoriteList(result);
                }
            });
    }

    const addFavoriteListStock = (request) => {
        const req_url = domain + api_path.member.add_favorite_list_stock;
        const req_data = {
            'member_account': request.member_account,
            'favorite_list_name': request.list_name,
            'stock_id': request.stock_id,
            'stock_name': request.stock_name
        };

        accessApiPost(req_url, req_data, '無法新增股票至我的最愛 ' + request.list_name)
            .then((response) => {
                if (response.metadata.status === 'success') {
                    setFavoriteList(prevState => ({
                        ...prevState,
                        [request['list_name']]: true,
                    }));
                }
            });
    }

    const deleteFavoriteListStock = (request) => {
        const req_url = domain + api_path.member.delete_favorite_list_stock;
        const req_data = {
            'member_account': request.member_account,
            'favorite_list_name': request.list_name,
            'stock_id': request.stock_id,
        };

        accessApiPost(req_url, req_data, '無法新增股票至我的最愛 ' + request.list_name)
            .then((response) => {
                if (response.metadata.status === 'success') {
                    setFavoriteList(prevState => ({
                        ...prevState,
                        [request['list_name']]: false,
                    }));
                }
            });
    }

    const getDividendInfo = (stock_id) => {
        const req_url = domain + api_path.stock.get_dividend_info;
        const req_data = {
            'stock_id': stock_id
        };

        accessApiGet(req_url, req_data, '無法取得股利政策')
            .then((response) => {
                if (response.metadata.status === 'success') {
                    let result = response.data.map(data => {
                        return {
                            time: data.period === 'FY' ? data.year : data.year + "/" + data.period,
                            cash: data.cash_dividend,
                            stock: data.stock_dividend,
                            make_up_dividend_days: data.make_up_dividend_days
                        };
                    });

                    result = result.slice(0, 15)

                    sort_by_time(result);

                    const dividendOverviewInfo = getDividendOverviewInfo(result);

                    setDividendInfo({
                        'overview': dividendOverviewInfo,
                        'data': result
                    });
                }
            });
    };

    const getCompanyProfile = (stock_id) => {
        const req_url = domain + api_path.stock.get_company_profile;
        const req_data = {
            'stock_id': stock_id
        };

        accessApiGet(req_url, req_data, '無法取得公司基本資料')
            .then((response) => {
                if (response.metadata.status === 'success') {
                    const result = {
                        'overview': {
                            'chairman': response.data.chairman,
                            'president': response.data.president,
                            'created_date': response.data.created_date,
                            'stock_date': response.data.stock_date,
                        },
                        'contact': {
                            'website': response.data.website,
                            'address': response.data.address,
                            'email': response.data.email,
                            'telephone': response.data.telephone,
                            'fax': response.data.fax,
                        },
                        'main_business': response.data.main_business,
                        'market': {
                            'share_capital': response.data.share_capital,
                            'market_value': response.data.market_value,
                            'share_holding_radio': response.data.share_holding_radio,
                        },
                    };

                    setCompanyProfile(result);
                }
            });
    };

    const getEps = (stock_id) => {
        const req_url = domain + api_path.stock.get_eps_info;
        const req_data = {
            'stock_id': stock_id
        };

        accessApiGet(req_url, req_data, '無法取得公司EPS')
            .then((response) => {
                let result = response['data'].map((data) => {
                    return {
                        time: data['year'] + data['season'],
                        value: data['eps']
                    };
                });

                sort_by_time(result);

                setEpsInfo(result);
            });
    };

    const getMonthlyRevenue = (stock_id) => {
        const req_url = domain + api_path.stock.get_revenue_info;
        const req_data = {
            'stock_id': stock_id
        };

        accessApiGet(req_url, req_data, '無法取得公司營收')
            .then((response) => {
                if (response.metadata.status === 'success') {
                    let result = response.data.map((data) => {
                        return {
                            time: data.year + '/' + data.month,
                            value: (data.revenue / 1000000000).toFixed(2)
                        };
                    });

                    sort_by_time(result);

                    setRevenueInfo(result);
                }
            });
    };

    const sort_by_time = (data) => {
        data = data.sort(function (a, b) {
            return a.time > b.time ? 1 : -1;
        });
    };

    return (
        <MDBContainer className='mt-3 stock_mainpage'>
            <div className='row'>
                <Dropdown className="col-4 add-list" autoClose="outside" onClick={() => {
                    if (member === "") {
                        navigate('/login', {
                            state: '/stock?id=' + searchParams.get("id")
                        });
                    }
                }}>
                    <Dropdown.Toggle id="dropdown-autoclose-outside">+加入追蹤</Dropdown.Toggle>

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
                    {showItems['dividend'] &&
                        <DividendCard
                            input_data={dividendInfo}
                            OnHide={setShowItems}
                        />}
                </div>
                <div className={'sub-content mb-2' + (showItems['company_profile'] ? '' : ' hidden')}>
                    {showItems['company_profile'] && <CompanyProfile input_data={companyProfile} />}
                </div>
                <div className={'sub-content mb-2' + (showItems['eps'] ? '' : ' hidden')}>
                    {showItems['eps'] &&
                        <EPSCard
                            input_data={epsInfo}
                            OnHide={setShowItems}
                        />}
                </div>
                <div className={'sub-content mb-2' + (showItems['revenue'] ? '' : ' hidden')}>
                    {showItems['revenue'] &&
                        <RevenueCard
                            input_data={revenueInfo}
                            OnHide={setShowItems}
                        />}
                </div>
            </div>
        </MDBContainer>
    );
}
export default Stock;
