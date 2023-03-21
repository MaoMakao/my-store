import React, { useState, useEffect } from "react";
import {  useDispatch } from "react-redux/es/exports";
import { NavLink, Link, useLocation } from "react-router-dom";
import { getCartFromLocalStorage } from "../../redux/reducers/cartSlice";
import styles from "./Header.module.scss";
import { useTypedSelector } from './../../hooks/useTypedSelector';

const Header = () => {
    const cart = useTypedSelector((store) => store.cart.cartItems);
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        if (localStorage.getItem("cart")) {
            dispatch(
                getCartFromLocalStorage({
                    cart: JSON.parse(localStorage.getItem("cart") as string),
                })
            );
        }
    }, [dispatch]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);
    


    return (
        <header className="mb-[59px]">
            <div className="fixed top-0 w-full z-50">
                <div className={styles.header}>
                    <div className={styles.wrapper}>
                        <Link className={styles.logo} to="/">
                            LOGO
                        </Link>
                        <menu className="right-0 absolute mr-8">
                            <NavLink to="cart" className={styles.header__item}>
                                <div>
                                    <i className="cart icon"></i>
                                    {cart.length ? cart.length : ""}
                                </div>
                            </NavLink>
                        </menu>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
