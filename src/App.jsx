import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from './pages/NotFound';
import Admin from './pages/Admin';
import {register} from './serviceWorker';
import BookDetailsPage from './pages/BookDetails';
import ProtectedRoute from './ProtectedRoutes';
import AdminRoute from './AdminRoute';
import Unauthorized from './pages/Unauthorized';

function App() {
    register();

    return (
        <Router>
            <ToastContainer />
            <Routes>
                <Route element={<ProtectedRoute />}>
                    <Route path='/' element={<Home />} />
                    <Route element={<AdminRoute />}>
                        <Route path='/admin/:userId' element={<Admin />} />
                    </Route>
                    <Route path='/book/:bookId' element={<BookDetailsPage />} />
                </Route>
                <Route path='/signin' exact element={<SignIn />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/unauthorized' element={<Unauthorized />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
