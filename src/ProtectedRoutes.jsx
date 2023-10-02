import {Navigate, Outlet, useLocation} from 'react-router-dom';

const ProtectedRoute = () => {
    const user = localStorage.getItem('User');

    const location = useLocation();
    return user ? (
        <Outlet />
    ) : (
        <Navigate to='/signin' replace={true} state={{from: location}} />
    );
};

export default ProtectedRoute;
