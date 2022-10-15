import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import LineChart from "../Chart/LineChart";
import "./MainInstantStock.css";

const MainInstantStock = ({ className, stock, trend_data }) => {
    const secretKey = "0123456789ASDFGH";
    const IV = CryptoJS.enc.Utf8.parse("1122334455");
    const navigate = useNavigate();

    const data = [
        {
            name : 'index',
            data : [
                {
                    time : '9:00:00',
                    value : 30
                },
                {
                    time : '10:00:00',
                    value : 31.3
                },
                {
                    time : '11:00:00',
                    value : 30.2
                },
                {
                    time : '12:00:00',
                    value : 29.4
                },
                {
                    time : '13:00:00',
                    value : 30.8
                }
            ]
        }
    ]
    const setting = {
        oneday_timeformat : false,
        xy_axis : false,
        line_color : {
            'index' : Number(stock['stock_value_offset'].slice(0,-1)) > 0 ? '#ff0000': 'green'
        }
    }

    useEffect(() => {
        if (trend_data[0].data !== undefined) {
            let root = document.querySelector(`.${className} .instant-trend`);
            LineChart(root, trend_data, setting);
        }
    },[className + JSON.stringify(trend_data)]);

    return (
        <div className={ "main-instant-stock " + (className || "") } onClick={(e)=>{
            const target = e.currentTarget.firstChild.firstChild;
            const [stock_id, stock_type] = target.children[1].textContent.trim().split(' ');

            const stock_info = {
                stock_name: target.firstChild.textContent,
                stock_id: stock_id,
                stock_type: stock_type,
            };

            const stock_info_encrypt = CryptoJS.AES.encrypt(
                JSON.stringify(stock_info),
                CryptoJS.enc.Utf8.parse(secretKey),
                {iv: IV, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.ZeroPadding}
            ).ciphertext.toString(CryptoJS.enc.Hex)

            navigate('/stock?id=' + stock_info_encrypt);
        }}>
            <div className = 'stock-info'>
                <div>
                    <h6> {stock['stock_name']} </h6>
                    <p> {stock['stock_id']} {stock['stock_type']} </p>
                </div>
                <div>
                    {   Number(stock['stock_value_offset'].slice(0,-1)) > 0
                        ?   <h5 className='rise'> {stock['stock_value']} </h5>
                        :   <h5 className='down'> {stock['stock_value']} </h5>
                    }
                    {
                        Number(stock['stock_value_offset'].slice(0,-1)) > 0
                        ?   <p className='rise'> {stock['stock_value_offset']} </p>
                        :   <p className='down'> {stock['stock_value_offset']} </p>
                    }
                </div>
            </div>
            <div className = 'instant-trend' />
        </div>
    );
}
export default MainInstantStock
