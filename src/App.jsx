import SignUp from './components/SignUp';
import SignIn from './components/Signin';
import Home from './components/Home';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {useContext} from 'react';
import {AuthContext} from './context/AuthContext';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const {user} = useContext(AuthContext);
    return (
        <Router>
            <ToastContainer />
            <Routes>
                <Route path='/' exact element={<Home />} />
                <Route path='/signup' element={user ? <Home /> : <SignUp />} />
                <Route path='/signin' element={user ? <Home /> : <SignIn />} />
            </Routes>
        </Router>
    );
}

export default App;
