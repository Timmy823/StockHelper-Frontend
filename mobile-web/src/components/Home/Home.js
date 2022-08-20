import React from "react";
import StockSearch from "../Search/StockSearch";
import MainInstantStock from "../Card/MainInstantStock";
import Bottombar from "../Tabbar/Bottombar";
import "./Home.css"

const Home = () => {
    return (
        <div>
            <StockSearch/>
            <div className='stock-home-page'>
                <div className='stock-index'>
                    <h3> 指數 </h3>
                    <MainInstantStock className='TAIEX-index'/>
                    <MainInstantStock className='TWO-index'/>
                </div>
                <div className='hot-stock'>
                    <h3> 熱門個股 </h3>
                    <MainInstantStock className='stock_2330'/>
                    <MainInstantStock className='stock_2498'/>
                    <MainInstantStock className='stock_2331'/>
                    <MainInstantStock className='stock_2492'/>
                </div>
                <div className='hot-etf'>
                    <h3> 熱門ETF </h3>
                    <MainInstantStock className='etf_2330'/>
                    <MainInstantStock className='etf_2498'/>
                    <MainInstantStock className='etf_2331'/>
                    <MainInstantStock className='etf_2492'/>
                </div>
            </div>
        </div>
    );
}
export default Home;
