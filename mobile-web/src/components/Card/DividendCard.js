import React, { useEffect } from "react";
import { MDBBtn, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import BarChart from "../Chart/BarChart";
import './Card.css'

const DividendCard = ({ input_data, OnHide }) => {
    const setting = {}
    useEffect(() => {
        let root = document.querySelector('.dividend_card .chart');
        BarChart(root, input_data, setting);
    }, [])

    return (
        <MDBContainer className='dividend_card'>
            <MDBRow>
                <h6 className='ms-2 mt-1 col-10'>股利政策</h6>
                <MDBBtn className='btn-close btn-close-white' color='none' onClick={() => {
                    OnHide(prevState => ({
                        ...prevState,
                        dividend: false,
                    }));
                }}></MDBBtn>
            </MDBRow>
            <MDBRow className='d-inline-flex ms-2 overview'>
                <p className='col-3'>填息率: {input_data[0]['overview']['makeup_probability']}%</p>
                <p className='col-4'>平均填息天數: {input_data[0]['overview']['makeup_avg_day']}天</p>
                <p className='col-4'>平均現金股利: {input_data[0]['overview']['decade_avg_cash_dividend']}元</p>
            </MDBRow>

            <div className='chart' />
        </MDBContainer>
    );
}
export default DividendCard;
