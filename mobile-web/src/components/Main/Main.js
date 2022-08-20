import React from "react"
import { Routes, Route } from "react-router-dom";
import Home from "../Home/Home";
import Login from "../Form/Login";
import Bottombar from "../Tabbar/Bottombar";

const Main = () => {
    return (
        <Routes>
            <Route path='/' element={<>
                <Home />
                <Bottombar />
            </>} />
            <Route path="/favorite" element={<Home/>} />
            <Route path='/login' element={<>
                <Login />
                <Bottombar />
            </>} />
        </Routes>
    );
}
export default Main
