import React, { useEffect } from "react";
import BarChart from "../Chart/BarChart";
import './Card.css'

const EPSCard = (props) => {
    const setting = {}
    useEffect(() => {
        console.log(props);
        let root = document.querySelector('.eps_card .chart');
        BarChart(root, props.input_data, setting);
        
    }, [])

    return (
        <div className='eps_card'>
            <h6 className='ms-3 mt-1'>EPS</h6>
            <div className='chart' />
        </div>
    )
}
export default EPSCard;
