import {createContext, useCallback, useEffect, useState} from 'react';
import {baseUrl, postRequest} from '../utils/Service';
import {toast} from 'react-toastify';

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [signingup, setSigningUp] = useState(false);
    const [loggingIn, setLoggingIn] = useState(false);
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: '',
    });
    const [registerInfo, setRegisterInfo] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
    });

    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info);
    });

    const updateLoginInfo = useCallback((info) => {
        setLoginInfo(info);
    });

    useEffect(() => {
        try {
            const user = localStorage.getItem('User');
            if (user) {
                const parsedUser = JSON.parse(user);
                if (parsedUser) {
                    setUser(parsedUser);
                }
            }
        } catch (error) {
            console.error('Error retrieving and parsing user data:', error);
        }
    }, []);

    const loginUser = useCallback(
        async (e) => {
            e.preventDefault();
            setLoggingIn(true);
            try {
                const response = await postRequest(
                    `${baseUrl}/api/user/signin`,
                    JSON.stringify(loginInfo),
                );
                setLoggingIn(false);
                if (response?.error) {
                    toast.error(response.message);
                } else {
                    localStorage.setItem('User', JSON.stringify(response));
                    setUser(response);
                    window.location.href = '/';
                    toast.success('Login Successful');
                }
            } catch (error) {
                console.error('An error occurred during Login:', error);
                setLoggingIn(false);
            }
        },
        [loginInfo],
    );

    const logoutUser = useCallback(() => {
        localStorage.removeItem('User');
        setUser(null);
        setLoginInfo({
            email: '',
            password: '',
        });
    });

    const registerUser = useCallback(
        async (e) => {
            e.preventDefault();
            setSigningUp(true);
            try {
                const response = await postRequest(
                    `${baseUrl}/api/user/signup`,
                    JSON.stringify(registerInfo),
                );
                setSigningUp(false);
                if (response?.error) {
                    toast.error(response.message);
                } else {
                    localStorage.setItem('User', JSON.stringify(response));
                    toast.success('Registration successful');
                    setUser(response);
                    window.location.href = '/';
                }
            } catch (error) {
                console.error('An error occurred during registration:', error);
                setSigningUp(false);
            }
        },
        [registerInfo],
    );

    return (
        <AuthContext.Provider
            value={{
                registerUser,
                registerInfo,
                updateRegisterInfo,
                user,
                signingup,
                loginUser,
                loginInfo,
                updateLoginInfo,
                loggingIn,
                logoutUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
