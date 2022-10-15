import React, { useEffect } from "react";
import BarChart from "../Chart/BarChart";
import './Card.css'

const RevenueCard = ({ input_data }) => {
    const setting = {
        'bar_color': {
            'value': ' #f4af1c',
        },
        'bar_padding': 0.05,
        'xaxis_interval': 11
    };
    
    useEffect(() => {
        let root = document.querySelector('.revenue_card .chart');
        BarChart(root, input_data, setting);
    }, [])

    return (
        <div className='revenue_card'>
            <h6 className='ms-3 mt-1'>營收</h6>
            <div className='chart' />
        </div>
    )
}
export default RevenueCard;
