import React, { useEffect, useState } from "react"
import { MDBContainer } from "mdb-react-ui-kit";
import MainInstantStock from "../../components/Card/MainInstantStock";
import "./Home.css"

const Home = ({ onLoad }) => {
    const [indexTrend, setIndexTrend] = useState({});
    const [stockTrend, setStockTrend] = useState({});
    const [etfTrend, setETFTrend] = useState({});

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

                    setIndexTrend(prevState => ({
                        ...prevState,
                        [stock_id] : result
                    }));
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

                    setStockTrend(prevState => ({
                        ...prevState,
                        [stock_id] : result
                    }));
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

                    setETFTrend(prevState => ({
                        ...prevState,
                        [stock_id] : result
                    }));
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
        onLoad(false);

        getHotIndexTrend('2330');
        getHotIndexTrend('2364');

        getHotStockTrend('2330');
        getHotStockTrend('5483');
        getHotStockTrend('1513');
        getHotStockTrend('2454');

        getHotETFTrend('0050');
        getHotETFTrend('0056');
        getHotETFTrend('00878');
        getHotETFTrend('00892');
    }, []);

    useEffect(()=>{
        if (Object.keys(indexTrend).length === 2 && 
            Object.keys(stockTrend).length === 4 && 
            Object.keys(etfTrend).length === 4) {
            onLoad(true);
        }
    }, [indexTrend, stockTrend, etfTrend]);

    return (
        <MDBContainer className='stock-home-page'>
            <div className='stock-index'>
                <h3> 指數 </h3>
                <MainInstantStock 
                    className='TAIEX-index' 
                    stock={{
                        'stock_name': '加權指數',
                        'stock_id': ' ',
                        'stock_type': ' ',
                        'stock_value': getLastClosingPrice(indexTrend['2330']),
                        'stock_value_offset': getStcokOffset(indexTrend['2330']),
                    }}
                    trend_data={[{
                        'name': 'index',
                        'data': indexTrend['2330']
                    }]}
                />
                <MainInstantStock 
                    className='TWO-index' 
                    stock={{
                        'stock_name': '櫃買指數',
                        'stock_id': ' ',
                        'stock_type': ' ',
                        'stock_value': getLastClosingPrice(indexTrend['2364']),
                        'stock_value_offset': getStcokOffset(indexTrend['2364']),
                    }}
                    trend_data={[{
                        'name': 'index',
                        'data': indexTrend['2364']
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
                        'stock_value': getLastClosingPrice(stockTrend['2330']),
                        'stock_value_offset': getStcokOffset(stockTrend['2330']),
                    }}
                    trend_data={[{
                        'name': 'index',
                        'data': stockTrend['2330']
                    }]}
                />
                <MainInstantStock 
                    className='stock_5483' 
                    stock={{
                        'stock_name': '中美晶',
                        'stock_id': '5483',
                        'stock_type': '上櫃',
                        'stock_value': getLastClosingPrice(stockTrend['5483']),
                        'stock_value_offset': getStcokOffset(stockTrend['5483']),
                    }}
                    trend_data={[{
                        'name': 'index',
                        'data': stockTrend['5483']
                    }]}
                />
                <MainInstantStock 
                    className='stock_1513' 
                    stock={{
                        'stock_name': '中興電',
                        'stock_id': '1513',
                        'stock_type': '上市',
                        'stock_value': getLastClosingPrice(stockTrend['1513']),
                        'stock_value_offset': getStcokOffset(stockTrend['1513']),
                    }}
                    trend_data={[{
                        'name': 'index',
                        'data': stockTrend['1513']
                    }]}
                />
                <MainInstantStock 
                    className='stock_2454' 
                    stock={{
                        'stock_name': '聯發科',
                        'stock_id': '2454',
                        'stock_type': '上市',
                        'stock_value': getLastClosingPrice(stockTrend['2454']),
                        'stock_value_offset': getStcokOffset(stockTrend['2454']),
                    }}
                    trend_data={[{
                        'name': 'index',
                        'data': stockTrend['2454']
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
                        'stock_value': getLastClosingPrice(etfTrend['0050']),
                        'stock_value_offset': getStcokOffset(etfTrend['0050']),
                    }}
                    trend_data={[{
                        'name': 'index',
                        'data': etfTrend['0050']
                    }]}
                />
                <MainInstantStock 
                    className='etf_0056' 
                    stock={{
                        'stock_name': '元大高股息',
                        'stock_id': '0056',
                        'stock_type': '上市',
                        'stock_value': getLastClosingPrice(etfTrend['0056']),
                        'stock_value_offset': getStcokOffset(etfTrend['0056']),
                    }}
                    trend_data={[{
                        'name': 'index',
                        'data': etfTrend['0056']
                    }]}
                />
                <MainInstantStock 
                    className='etf_00878' 
                    stock={{
                        'stock_name': '國泰永續高股息',
                        'stock_id': '00878',
                        'stock_type': '上市',
                        'stock_value': getLastClosingPrice(etfTrend['00878']),
                        'stock_value_offset': getStcokOffset(etfTrend['00878']),
                    }}
                    trend_data={[{
                        'name': 'index',
                        'data': etfTrend['00878']
                    }]}
                />
                <MainInstantStock 
                    className='etf_00892' 
                    stock={{
                        'stock_name': '富邦台灣半導體',
                        'stock_id': '00892',
                        'stock_type': '上市',
                        'stock_value': getLastClosingPrice(etfTrend['00892']),
                        'stock_value_offset': getStcokOffset(etfTrend['00892']),
                    }}
                    trend_data={[{
                        'name': 'index',
                        'data': etfTrend['00892']
                    }]}
                />
            </div>
        </MDBContainer>
    );
}
export default Home;
