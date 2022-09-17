import React from "react";
import './Card.css'

const CompanyProfile = (props) => {
    return (
        <div className='company_profile_card'>
            <h6 className='mt-1 mb-3'> 公司基本資訊 </h6>
            <div className='row'>
                <div className='col-3 col-xl-2 mb-2'>
                    <p className='mb-0 text-400'>董事長</p>
                    <p className='mb-0'>{props.input_data.overview.chairman}</p>
                </div>
                <div className='col-3 col-xl-2 mb-2'>
                    <p className='mb-0 text-400'>總經理</p>
                    <p className='mb-0'>{props.input_data.overview.president}</p>
                </div>
                <div className='col-3 col-xl-2 mb-2'>
                    <p className='mb-0 text-400'>公司成立時間</p>
                    <p className='mb-0'>{props.input_data.overview.created_date}</p>
                </div>
                <div className='col-3 col-xl-2 mb-2'>
                    <p className='mb-0 text-400'>上市(櫃)時間</p>
                    <p className='mb-0'>{props.input_data.overview.stock_date}</p>
                </div>
            </div>

            <div className='row'>
                <div className='col-12 mb-2'>
                    <p className='mb-0 text-400'>公司地址</p>
                    <p className='mb-0'>{props.input_data.contact.address}</p>
                </div>
            </div>
            <div className='row'>
                <div className='col-12 mb-2'>
                    <p className='mb-0 text-400'>公司網站</p>
                    <p className='mb-0'>{props.input_data.contact.website}</p>
                </div>
            </div>
            
            <div className='row'>
                <div className='col-4 col-lg-3 col-xl-2 mb-2'>
                    <p className='mb-0 text-400'>公司電子信箱</p>
                    <p className='mb-0'>{props.input_data.contact.email}</p>
                </div>
                <div className='col-4 col-lg-3 col-xl-2 mb-2'>
                    <p className='mb-0 text-400'>公司電話</p>
                    <p className='mb-0'>{props.input_data.contact.telephone}</p>
                </div>
                <div className='col-4 col-lg-3 col-xl-2 mb-2'>
                    <p className='mb-0 text-400'>公司傳真號碼</p>
                    <p className='mb-0'>{props.input_data.contact.fax}</p>
                </div>
            </div>

            <div className='row'>
                <div className='col-12 mb-2'>
                    <p className='mb-0 text-400'>主要業務</p>
                    <p className='mb-0'>{props.input_data.main_business}</p>
                </div>
            </div>
            <div className='row'>
                <div className='col-4 col-lg-3 col-xl-2 mb-2'>
                    <p className='mb-0 text-400'>股本(百萬)</p>
                    <p className='mb-0'>{props.input_data.market.share_capital}</p>
                </div>
                <div className='col-4 col-lg-3 col-xl-2 mb-2'>
                    <p className='mb-0 text-400'>市值(百萬)</p>
                    <p className='mb-0'>{props.input_data.market.market_value}</p>
                </div>
            </div> 
        </div>
    )
}
export default CompanyProfile;
