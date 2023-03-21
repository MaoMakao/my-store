import React from "react";
import { Outlet } from 'react-router-dom';
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Notification from "./HelperComponents/Notification";
import { useSelector } from 'react-redux';

const Layout = () => {
    const {message} = useSelector(store => store.notification)

    return(
        <>
            <Header/>
            <Outlet/>
            <Footer/>


            {message && <Notification />}
        </>
    )
};
export default Layout;