import React from "react";
import ListInstantStock from "../../components/Card/ListInstantStock";
import "./Favorite.css";

const Favorite = () => {
    return (
        <div>
            <div className='favorite-page'>
                <div className='option-button-list'>
                    <li className='option-button'> 紡織股 </li>
                    <li className='option-button'> 半導體權值電子股 </li>
                    <li className='option-button'> 半導體權值電子股 </li>
                    <li className='option-button'> 半導體權值電子股 </li>
                </div>
                <div className='stock-list'>
                    <ListInstantStock className='stock_2330'/>
                    <hr/>
                    <ListInstantStock className='stock_2498'/>
                    <hr/>
                    <ListInstantStock className='stock_2331'/>
                    <hr/>
                    <ListInstantStock className='stock_2492'/>
                </div>
            </div>
        </div>
    );
}
export default Favorite;
