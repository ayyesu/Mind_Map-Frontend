import React from 'react';
import {Route, Navigate} from 'react-router-dom';

const AdminRoute = ({element}) => {
    const isAdmin = localStorage.getItem('User').role === 'admin';

    return isAdmin ? element : <Navigate to='/unauthorized' />;
};

export default AdminRoute;
