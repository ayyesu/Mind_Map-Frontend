import SignUp from './components/SignUp';
import SignIn from './components/Signin';
import Home from './pages/Home';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {useContext} from 'react';
import {AuthContext} from './context/AuthContext';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from './pages/NotFound';
import Admin from './pages/Admin';
import {BookContextProvider} from './context/BookContext';

function App() {
    const {user} = useContext(AuthContext);
    return (
        <Router>
            <BookContextProvider>
                <ToastContainer />
                <Routes>
                    <Route
                        path='/'
                        exact
                        element={user ? <Home /> : <SignIn />}
                    />
                    <Route
                        path='/signup'
                        element={user ? <Home /> : <SignUp />}
                    />
                    <Route
                        path='/signin'
                        element={user ? <Home /> : <SignIn />}
                    />
                    <Route path='/admin' element={<Admin />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </BookContextProvider>
        </Router>
    );
}

export default App;
