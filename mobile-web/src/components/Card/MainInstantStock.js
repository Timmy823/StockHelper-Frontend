import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import LineChart from "../Chart/LineChart";
import "./MainInstantStock.css";

const MainInstantStock = (props) => {
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
        oneday_timeformat : true,
        xy_axis : false,
        line_color : {
            'index' : '#ff0000'
        }
    }

    useEffect(() => {
        let root = document.querySelector(`.${props.className} .instant-trend`);
        LineChart(root, data, setting);
    },[])

    return (
        <div className={ "main-instant-stock " + (props.className || "") } onClick={(e)=>{
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
                    <h6> {props.input_data['stock_name']} </h6>
                    <p> {props.input_data['stock_id']} {props.input_data['stock_type']} </p>
                </div>
                <div>
                    <h5> {props.input_data['stock_value']} </h5>
                    <p> {props.input_data['stock_value_offset']} </p>
                </div>
            </div>
            <div className = 'instant-trend' />
        </div>
    );
}
export default MainInstantStock
