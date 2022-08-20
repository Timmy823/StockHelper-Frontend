import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Home/Home";
import Favorite from "../Favorite/Favorite";
import Login from "../Account/Login";
import StockSearch from "../../components/Search/StockSearch";
import Bottombar from "../../components/Tabbar/Bottombar";
import Register from "../Account/Register";

const Main = () => {
    return (
        <Routes>
            <Route path='/' element={<>
                <Home />
                <Bottombar index={0}/>
            </>} />
            <Route path="/favorite" element={<>
                <StockSearch />
                <Favorite />
                <Bottombar index={1}/>
            </>} />
            <Route path='/login' element={<>
                <Login />
                <Bottombar index={2}/>
            </>} />

            <Route path='/register' element={<>
                <Register />
                <Bottombar index={2}/>
            </>} />
        </Routes>
    );
}
export default Main
