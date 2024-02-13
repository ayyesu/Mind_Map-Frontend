import React, {useContext} from 'react';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from './pages/NotFound';
import Admin from './pages/Admin';
import {register} from './serviceWorker';
import BookDetailsPage from './pages/Book/BookDetails';
import ProtectedRoute from './ProtectedRoutes';
import AdminRoute from './AdminRoute';
import Unauthorized from './pages/Unauthorized';
import UserBooks from './pages/UserBooks';
import AdminRequestForm from './pages/AdminRequest';
import {AuthContext} from './context/AuthContext';

function App() {
    register();

    const {user} = useContext(AuthContext);

    return (
        <Router>
            <ToastContainer />
            <Routes>
                <Route element={<ProtectedRoute />}>
                    <Route path='/' element={user ? <Home /> : null} />
                    <Route element={<AdminRoute />}>
                        <Route path='/admin/:userId' element={<Admin />} />
                        <Route
                            path='/user/posts/:userId'
                            element={<UserBooks />}
                        />
                    </Route>
                    <Route path='/book/:bookId' element={<BookDetailsPage />} />
                </Route>
                <Route path='/signin' exact element={<SignIn />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/unauthorized' element={<Unauthorized />} />
                <Route path='/request-admin' element={<AdminRequestForm />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
