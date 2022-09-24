import React, { useEffect } from "react";
import LineChart from "../Chart/LineChart";
import "./MainInstantStock.css";

const MainInstantStock = (props) => {
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
    })

    return (
        <div className={ "main-instant-stock " + (props.className || "") }>
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
