import React from "react";
import StockSearch from "../../components/Search/StockSearch";
import MainInstantStock from "../../components/Card/MainInstantStock";
import "./Home.css"

const Home = () => {
    return (
        <div>
            <StockSearch/>
            <div className='stock-home-page'>
                <div className='stock-index'>
                    <h3> 指數 </h3>
                    <MainInstantStock className='TAIEX-index' input_data={{
                        'stock_name': '加權指數',
                        'stock_id': ' ',
                        'stock_type': ' ',
                        'industry_type': '大盤指數',
                        'stock_value': '14263.00',
                        'stock_value_offset': '-1.23%'
                    }}/>
                    <MainInstantStock className='TWO-index' input_data={{
                        'stock_name': '櫃買指數',
                        'stock_id': ' ',
                        'stock_type': ' ',
                        'industry_type': '櫃買指數',
                        'stock_value': '157.00',
                        'stock_value_offset': '+0.32%'
                    }}/>
                </div>
                <div className='hot-stock'>
                    <h3> 熱門個股 </h3>
                    <MainInstantStock className='stock_2330' input_data={{
                        'stock_name': '台積電',
                        'stock_id': '2330',
                        'stock_type': '上市',
                        'industry_type': '電子半導體',
                        'stock_value': '456.0',
                        'stock_value_offset': '-1.23%'
                    }}/>
                    <MainInstantStock className='stock_5483' input_data={{
                        'stock_name': '中美晶',
                        'stock_id': '5483',
                        'stock_type': '上櫃',
                        'industry_type': '電子半導體',
                        'stock_value': '157.00',
                        'stock_value_offset': '+0.32%'
                    }}/>
                    <MainInstantStock className='stock_1513' input_data={{
                        'stock_name': '中興電',
                        'stock_id': '1513',
                        'stock_type': '上市',
                        'industry_type': '電機機械',
                        'stock_value': '63.80',
                        'stock_value_offset': '-4.20%'
                    }}/>
                    <MainInstantStock className='stock_2454' input_data={{
                        'stock_name': '聯發科',
                        'stock_id': '2454',
                        'stock_type': '上市',
                        'industry_type': '電子半導體',
                        'stock_value': '580.00',
                        'stock_value_offset': '-1.86%'
                    }}/>
                </div>
                <div className='hot-etf'>
                    <h3> 熱門ETF </h3>
                    <MainInstantStock className='etf_2330' input_data={{
                        'stock_name': '台積電',
                        'stock_id': '2330',
                        'stock_type': '上市',
                        'industry_type': '電子半導體',
                        'stock_value': '456.0',
                        'stock_value_offset': '-1.23%'
                    }}/>
                    <MainInstantStock className='etf_5483' input_data={{
                        'stock_name': '中美晶',
                        'stock_id': '5483',
                        'stock_type': '上櫃',
                        'industry_type': '電子半導體',
                        'stock_value': '157.00',
                        'stock_value_offset': '+0.32%'
                    }}/>
                    <MainInstantStock className='etf_1513' input_data={{
                        'stock_name': '中興電',
                        'stock_id': '1513',
                        'stock_type': '上市',
                        'industry_type': '電機機械',
                        'stock_value': '63.80',
                        'stock_value_offset': '-4.20%'
                    }}/>
                    <MainInstantStock className='etf_2454' input_data={{
                        'stock_name': '聯發科',
                        'stock_id': '2454',
                        'stock_type': '上市',
                        'industry_type': '電子半導體',
                        'stock_value': '580.00',
                        'stock_value_offset': '-1.86%'
                    }}/>
                </div>
            </div>
        </div>
    );
}
export default Home;
