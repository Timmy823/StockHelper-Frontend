import React from "react"
import { Routes, Route } from "react-router-dom";
import Home from "../Home/Home";
import Favorite from "../Favorite/Favorite";
import Login from "../Form/Login";
import StockSearch from "../Search/StockSearch";
import Bottombar from "../Tabbar/Bottombar";

const Main = () => {
    return (
        <Routes>
            <Route path='/' element={<>
                <Home />
                <Bottombar />
            </>} />
            <Route path="/favorite" element={<>
                <StockSearch />
                <Favorite />
                <Bottombar />
            </>} />
            <Route path='/login' element={<>
                <Login />
                <Bottombar />
            </>} />
        </Routes>
    );
}
export default Main
