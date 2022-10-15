import React, { useEffect, useState } from "react"
import StockSearch from "../../components/Search/StockSearch";
import MainInstantStock from "../../components/Card/MainInstantStock";
import "./Home.css"

const Home = () => {
    const [indexTrend, setIndexTrend] = useState([]);
    const [stockTrend, setStockTrend] = useState([]);
    const [etfTrend, setETFTrend] = useState([]);

    const getHotIndexTrend = (stock_id) => {
        getRecentStockClosingPrice(stock_id)
            .then((response)=>{
                if (response.metadata.status === 'success') {
                    let result = response.data.map((data)=>{
                        return {
                            'time': data.date.substring(0,4) + '-' + data.date.substring(4,6) + '-' + data.date.substring(6,8),
                            'value': Number(data.closing_price)
                        };
                    });

                    setIndexTrend(prevState => ([
                        ...prevState,
                        result
                    ]));
                }
            });
    };

    const getHotStockTrend = (stock_id) => {
        getRecentStockClosingPrice(stock_id)
            .then((response)=>{
                if (response.metadata.status === 'success') {
                    let result = response.data.map((data)=>{
                        return {
                            'time': data.date.substring(0,4) + '-' + data.date.substring(4,6) + '-' + data.date.substring(6,8),
                            'value': Number(data.closing_price)
                        };
                    });

                    setStockTrend(prevState => ([
                        ...prevState,
                        result
                    ]));
                }
            });
    };

    const getHotETFTrend = (stock_id) => {
        getRecentStockClosingPrice(stock_id)
            .then((response)=>{
                if (response.metadata.status === 'success') {
                    let result = response.data.map((data)=>{
                        return {
                            'time': data.date.substring(0,4) + '-' + data.date.substring(4,6) + '-' + data.date.substring(6,8),
                            'value': Number(data.closing_price)
                        };
                    });

                    setETFTrend(prevState => ([
                        ...prevState,
                        result
                    ]));
                }
            });
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

    useEffect(() => {
        getHotIndexTrend('2330');
        getHotIndexTrend('1513');

        getHotStockTrend('2330');
        getHotStockTrend('5483');
        getHotStockTrend('1513');
        getHotStockTrend('2454');

        getHotETFTrend('0050');
        getHotETFTrend('0056');
        getHotETFTrend('00878');
        getHotETFTrend('00892');
    }, []);

    return (
        <div>
            <StockSearch/>
            <div className='stock-home-page'>
                <div className='stock-index'>
                    <h3> 指數 </h3>
                    <MainInstantStock 
                        className='TAIEX-index' 
                        stock={{
                            'stock_name': '加權指數',
                            'stock_id': ' ',
                            'stock_type': ' ',
                            'stock_value': '14263.00',
                            'stock_value_offset': '-1.23%'
                        }}
                        trend_data={[{
                            'name': 'index',
                            'data': indexTrend[0]
                        }]}
                    />
                    <MainInstantStock 
                        className='TWO-index' 
                        stock={{
                            'stock_name': '櫃買指數',
                            'stock_id': ' ',
                            'stock_type': ' ',
                            'stock_value': '157.00',
                            'stock_value_offset': '+0.32%'
                        }}
                        trend_data={[{
                            'name': 'index',
                            'data': indexTrend[1]
                        }]}
                    />
                </div>
                <div className='hot-stock'>
                    <h3> 熱門個股 </h3>
                    <MainInstantStock 
                        className='stock_2330' 
                        stock={{
                            'stock_name': '台積電',
                            'stock_id': '2330',
                            'stock_type': '上市',
                            'stock_value': '456.0',
                            'stock_value_offset': '-1.23%'
                        }}
                        trend_data={[{
                            'name': 'index',
                            'data': stockTrend[0]
                        }]}
                    />
                    <MainInstantStock 
                        className='stock_5483' 
                        stock={{
                            'stock_name': '中美晶',
                            'stock_id': '5483',
                            'stock_type': '上櫃',
                            'stock_value': '157.00',
                            'stock_value_offset': '+0.32%'
                        }}
                        trend_data={[{
                            'name': 'index',
                            'data': stockTrend[1]
                        }]}
                    />
                    <MainInstantStock 
                        className='stock_1513' 
                        stock={{
                            'stock_name': '中興電',
                            'stock_id': '1513',
                            'stock_type': '上市',
                            'stock_value': '63.80',
                            'stock_value_offset': '-4.20%'
                        }}
                        trend_data={[{
                            'name': 'index',
                            'data': stockTrend[2]
                        }]}
                    />
                    <MainInstantStock 
                        className='stock_2454' 
                        stock={{
                            'stock_name': '聯發科',
                            'stock_id': '2454',
                            'stock_type': '上市',
                            'stock_value': '580.00',
                            'stock_value_offset': '-1.86%'
                        }}
                        trend_data={[{
                            'name': 'index',
                            'data': stockTrend[3]
                        }]}
                    />
                </div>
                <div className='hot-etf'>
                    <h3> 熱門ETF </h3>
                    <MainInstantStock 
                        className='etf_0050' 
                        stock={{
                            'stock_name': '元大台灣50',
                            'stock_id': '0050',
                            'stock_type': '上市',
                            'stock_value': '456.0',
                            'stock_value_offset': '-1.23%'
                        }}
                        trend_data={[{
                            'name': 'index',
                            'data': etfTrend[0]
                        }]}
                    />
                    <MainInstantStock 
                        className='etf_0056' 
                        stock={{
                            'stock_name': '元大高股息',
                            'stock_id': '0056',
                            'stock_type': '上市',
                            'stock_value': '157.00',
                            'stock_value_offset': '+0.32%'
                        }}
                        trend_data={[{
                            'name': 'index',
                            'data': etfTrend[1]
                        }]}
                    />
                    <MainInstantStock 
                        className='etf_00878' 
                        stock={{
                            'stock_name': '國泰永續高股息',
                            'stock_id': '00878',
                            'stock_type': '上市',
                            'stock_value': '63.80',
                            'stock_value_offset': '-4.20%'
                        }}
                        trend_data={[{
                            'name': 'index',
                            'data': etfTrend[2]
                        }]}
                    />
                    <MainInstantStock 
                        className='etf_00892' 
                        stock={{
                            'stock_name': '富邦台灣半導體',
                            'stock_id': '00892',
                            'stock_type': '上市',
                            'stock_value': '580.00',
                            'stock_value_offset': '-1.86%'
                        }}
                        trend_data={[{
                            'name': 'index',
                            'data': etfTrend[3]
                        }]}
                    />
                </div>
            </div>
        </div>
    );
}
export default Home;
