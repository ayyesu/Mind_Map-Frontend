import React, {useContext} from 'react';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from './pages/NotFound';
import PostBook from './pages/PostBook';
import {register} from './serviceWorker';
import BookDetailsPage from './pages/Book/BookDetails';
import ProtectedRoute from './ProtectedRoutes';
import AdminRoute from './AdminRoute';
import Unauthorized from './pages/Unauthorized';
import ManageBook from './pages/ManageBook';
import Waitlist from './pages/Waitlist';
import {AuthContext} from './context/AuthContext';
import UpdateBook from './pages/UpdateBook';
import ResetPasswordEmailRequest from './pages/ResetPasswordEmailRequest';
import PasswordReset from './pages/PasswordReset';

function App() {
    register();

    const {user} = useContext(AuthContext);

    return (
        <Router>
            <ToastContainer />
            <Routes>
                <Route element={<ProtectedRoute />}>
                    <Route path='/' element={user ? <Home /> : <SignIn />} />
                    <Route path='/admin/:userId' element={<PostBook />} />
                    <Route
                        path='/user/posts/:userId'
                        element={user ? <ManageBook /> : <SignIn />}
                    />
                    {/* <Route element={<AdminRoute />}></Route> */}
                    <Route
                        path='/book/:bookId'
                        element={user ? <BookDetailsPage /> : <SignIn />}
                    />
                </Route>
                <Route
                    path='/signin'
                    exact
                    element={user ? <Home /> : <SignIn />}
                />
                <Route
                    path='/reset-password'
                    element={<ResetPasswordEmailRequest />}
                />
                <Route
                    path='/reset-password/:token'
                    element={<PasswordReset />}
                />
                <Route path='/signup' element={user ? <Home /> : <SignUp />} />
                <Route path='/unauthorized' element={<Unauthorized />} />
                <Route
                    path='/update-book/:bookId'
                    element={user ? <UpdateBook /> : <SignIn />}
                />
                <Route
                    path='/join-waitlist'
                    element={user ? <Waitlist /> : <SignIn />}
                />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
