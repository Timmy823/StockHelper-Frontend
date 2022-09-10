import React, { useEffect } from "react";
import BarChart from "../Chart/BarChart";


const DividendCard = (props) => {
    const setting = {}
    useEffect(() => {
        let root = document.querySelector(`.${props.className} .chart`);
        BarChart(root, props.data, setting);
    })

    return (
        <div className='dividend_card'>
            <div >
                <h5>股利政策</h5>
                <h6>填息機率: {props.makeup_probability}</h6>
                <h6>平均填息天數: {props.makeup_avg_day}</h6>
                <h6>近十年平均現金股利: {props.decade_avg_cash_dividend}</h6>
            </div>
            <div className='chart' />
        </div>
    )
}
export default DividendCard;
