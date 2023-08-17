import Home from './components/Home';
import SignUp from './components/SignUp';
import SignIn from './components/Signin';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' exact element={<SignUp />} />
                <Route path='/signin' element={<SignIn />} />
                <Route path='/home' element={<Home />} />
            </Routes>
        </Router>
    );
}

export default App;
