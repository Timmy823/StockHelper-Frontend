import React, { useEffect } from "react";
import BarChart from "../Chart/BarChart";
import './Card.css'

const RevenueCard = (props) => {
    const setting = {}
    useEffect(() => {
        let root = document.querySelector('.revenue_card .chart');
        BarChart(root, props.input_data, setting);
    }, [])

    return (
        <div className='revenue_card'>
            <h6>營收</h6>
            <div className='chart' />
        </div>
    )
}
export default RevenueCard;
