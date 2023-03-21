import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import {useSelector} from 'react-redux';
import { useAuth } from './user-auth';

const RequireAuth = ({ children }) => {
    const user = useSelector(store => store.user);
    const location = useLocation();
    const { isAuth} = useAuth();

    if (!isAuth) {
        return <Navigate to="/sign-in" state={{ from: location }} />;
    }

    return children;
};

export default RequireAuth;
