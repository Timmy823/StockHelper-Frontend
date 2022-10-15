import React, { useEffect } from "react";
import { MDBBtn, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import BarChart from "../Chart/BarChart";
import './Card.css'

const RevenueCard = ({ input_data, OnHide }) => {
    const setting = {
        'bar_color': {
            'value': ' #f4af1c',
        },
        'bar_padding': 0.05,
        'xaxis_interval': 11,
        'yaxis_label_name': '億'
    };
    
    useEffect(() => {
        let root = document.querySelector('.revenue_card .chart');
        BarChart(root, input_data, setting);
    }, [])

    return (
        <MDBContainer className='revenue_card'>
            <MDBRow>
                <h6 className='ms-2 mt-1 col-10'>營收</h6>
                <MDBBtn className='btn-close btn-close-white' color='none' onClick={() => {
                    OnHide(prevState => ({
                        ...prevState,
                        revenue: false,
                    }));
                }}></MDBBtn>
            </MDBRow>
            <div className='chart' />
        </MDBContainer>
    );
}
export default RevenueCard;
