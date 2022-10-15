import React, { useEffect } from "react";
import { MDBBtn, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import BarChart from "../Chart/BarChart";
import './Card.css'

const EPSCard = ({ input_data, OnHide }) => {
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
        <MDBContainer className='eps_card'>
            <MDBRow>
                <h6 className='ms-2 mt-1 col-10'>EPS</h6>
                <MDBBtn className='btn-close btn-close-white' color='none' onClick={() => {
                    OnHide(prevState => ({
                        ...prevState,
                        eps: false,
                    }));
                }}></MDBBtn>
            </MDBRow>
            <div className='chart' />
        </MDBContainer>
    )
}
export default EPSCard;
