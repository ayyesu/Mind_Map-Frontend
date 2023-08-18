import NavBar from './components/NavBar';
import SignUp from './components/SignUp';
import SignIn from './components/Signin';
import Home from './components/Home';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' exact element={<Home />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/signin' element={<SignIn />} />
                <Route path='/home' element={<NavBar />} />
            </Routes>
        </Router>
    );
}

export default App;
