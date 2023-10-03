import React from 'react';
import {Outlet, Navigate} from 'react-router-dom';

const AdminRoute = () => {
    const user = JSON.parse(localStorage.getItem('User'));
    const isAdmin = user.user?.role === 'admin';

    return isAdmin ? <Outlet /> : <Navigate to='/unauthorized' />;
};

export default AdminRoute;
