import SignUp from './components/SignUp';
import SignIn from './components/Signin';
import Home from './pages/Home';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from './pages/NotFound';
import Admin from './pages/Admin';
import {register} from './serviceWorker';
import BookDetailsPage from './pages/BookDetails';
import ProtectedRoute from './ProtectedRoutes';

function App() {
    register();

    return (
        <Router>
            <ToastContainer />
            <Routes>
                <Route element={<ProtectedRoute />}>
                    <Route path='/' element={<Home />} />
                    <Route path='/admin' element={<Admin />} />
                    <Route path='/book/:bookId' element={<BookDetailsPage />} />
                </Route>
                <Route path='/signin' exact element={<SignIn />} />
                <Route path='/signup' element={<SignUp />} />

                <Route path='*' element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
