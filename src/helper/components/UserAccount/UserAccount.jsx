import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux/es/exports";
import OrderCard from "./OrderCard";
import styles from "./UserAccount.module.scss"
import { logoutUser } from "../../redux/reducers/userSlice";
import { mockedData } from './../../mockedData';
import { useAuth } from './../../hoc/user-auth';

const UserAccount = () => {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const [orders, setOrders] = useState([]);
    const {isAuth} = useAuth();

    useEffect(() => {
        // (async () => {
        //     const response = await axios.get(
        //         `http://localhost:3001/orders?q=${user.email}`
        //     );
        // })();
       isAuth && setOrders(mockedData.orders);
    }, [isAuth]);

    return (
        <div className={styles.user__wrapper}>
            <div className={styles.user__header}>
                <div>{user.email}</div>
                <div onClick={()=>dispatch(logoutUser())} className="hover:underline cursor-pointer">Logout</div>
            </div>
            {orders.length
                ? orders.map((order) => (
                      <OrderCard order={order} key={order.id} />
                  ))
                : <div className='text-center'>There will be your orders</div>}
        </div>
    );
};

export default UserAccount;
