import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './normalize.css';
import './App.css';
import {AuthContextProvider} from './context/AuthContext.jsx';
import {BookContextProvider} from './context/BookContext';
import {FunctionContextProvider} from './context/functionContext.jsx';
import Modal from 'react-modal';

Modal.setAppElement('#root');

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthContextProvider>
            <FunctionContextProvider>
                <BookContextProvider>
                    <App />
                </BookContextProvider>
            </FunctionContextProvider>
        </AuthContextProvider>
    </React.StrictMode>,
);
