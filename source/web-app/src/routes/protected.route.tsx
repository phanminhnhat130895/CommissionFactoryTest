import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isAuth }: { isAuth: boolean }) => {
    if(isAuth) {
        return <Outlet />;
    }
    return <Navigate to="/login" />;
}

export default ProtectedRoute;
