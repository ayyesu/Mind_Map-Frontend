import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './normalize.css';
import './App.css';
import {AuthContextProvider} from './context/AuthContext.jsx';
import {BookContextProvider} from './context/BookContext';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthContextProvider>
            <BookContextProvider>
                <App />
            </BookContextProvider>
        </AuthContextProvider>
    </React.StrictMode>,
);
