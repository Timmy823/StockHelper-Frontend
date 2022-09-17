import React, { useEffect } from "react";
import BarChart from "../Chart/BarChart";
import './Card.css'

const DividendCard = (props) => {
    const setting = {}
    useEffect(() => {
        let root = document.querySelector('.dividend_card .chart');
        BarChart(root, props.input_data, setting);
        console.log(props);
    }, [])

    return (
        <div className='dividend_card'>
            <h6>股利政策</h6>
            <div className='overview'>
                <p>近15年</p>
                <p>填息率: {props.input_data[0]['overview']['makeup_probability']}%</p>
                <p>平均填息天數: {props.input_data[0]['overview']['makeup_avg_day']}天</p>
                <p>平均現金股利: {props.input_data[0]['overview']['decade_avg_cash_dividend']}元</p>
            </div>
            <div className='chart' />
        </div>
    )
}
export default DividendCard;
