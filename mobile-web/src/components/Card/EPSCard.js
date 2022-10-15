import React, { useEffect } from "react";
import BarChart from "../Chart/BarChart";
import './Card.css'

const EPSCard = ({ input_data }) => {
    const setting = {
        'bar_color': {
            'value': ' #f4af1c',
        },
        'bar_padding': 0.1,
        'xaxis_interval': 5
    };

    useEffect(() => {
        let root = document.querySelector('.eps_card .chart');
        BarChart(root, input_data, setting);
    }, [])

    return (
        <div className='eps_card'>
            <h6 className='ms-3 mt-1'>EPS</h6>
            <div className='chart' />
        </div>
    )
}
export default EPSCard;
