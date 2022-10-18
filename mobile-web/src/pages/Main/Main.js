import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Home/Home";
import Favorite from "../Favorite/Favorite";
import Stock from "../Stock/Stock";

import StockSearch from "../../components/Search/StockSearch";
import Bottombar from "../../components/Tabbar/Bottombar";

import Account from "../Account/Account";
import Login from "../Account/Login";
import Register from "../Account/Register";
import ResetPassword from "../Account/ResetPassword";
import VerifyCertification from "../Account/VerifyCertification";
import Loading from "../Loading/Loading";

const Main = () => {
    const [state, setState] = useState(false);

    return (
        <Routes>
            <Route path='/' element={<>
                {!state&&<Loading />}
                <StockSearch />
                <Home onLoad={setState}/>
                <Bottombar index={0}/>
            </>} />
            <Route path="/favorite" element={<>
                {!state&&<Loading />}
                <StockSearch />
                <Favorite onLoad={setState}/>
                <Bottombar index={1}/>
            </>} />

            <Route path='/account' element={<>
                <Account />
                <Bottombar index={2}/>
            </>} /> 
            <Route path='/login' element={<>
                <Login />
                <Bottombar index={2}/>
            </>} />
            <Route path='/register' element={<>
                <Register />
                <Bottombar index={2}/>
            </>} />
            <Route path='/reset_password' element={<>
                <ResetPassword />
                <Bottombar index={2}/>
            </>} />
            <Route path='/verify_certification' element={<>
                <VerifyCertification />
                <Bottombar index={2}/>
            </>} />

            <Route path='/stock' element={<>
                <StockSearch />
                <Stock />
            </>} />
        </Routes>
    );
}
export default Main
