import {createContext, useCallback, useEffect, useState} from 'react';
import {baseUrl, postRequest} from '../utils/Service';
import {toast} from 'react-toastify';

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [signingup, setSigningUp] = useState(false);
    const [loggingIn, setLoggingIn] = useState(false);
    const [resettingPassword, setResettingPassword] = useState(false);
    const [requestingPasswordReset, setRequestingPasswordReset] =
        useState(false);
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
            const trimmedLoginInfo = {
                email: loginInfo.email.trim(),
                password: loginInfo.password.trim(),
            };
            try {
                const response = await postRequest(
                    `${baseUrl}/api/user/signin`,
                    JSON.stringify(trimmedLoginInfo),
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
        window.location.reload();
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
                }
            } catch (error) {
                console.error('An error occurred during registration:', error);
                setSigningUp(false);
            }
        },
        [registerInfo],
    );

    const requestPasswordReset = async (email) => {
        try {
            setRequestingPasswordReset(true);
            const response = await postRequest(
                `${baseUrl}/api/user/reset-password-email-request`,

                {email},
            );
            localStorage.setItem('resetEmail', email);

            if (response.error) {
                toast.error(response?.message, {
                    pauseOnHover: false,
                });
                setRequestingPasswordReset(false);
            } else {
                toast.success(response.message, {
                    pauseOnHover: false,
                });
                setRequestingPasswordReset(false);
            }
        } catch (error) {
            console.error('Error creating password reset request:', error);
            setRequestingPasswordReset(false);
        }
    };

    const resetPassword = async (
        password,
        confirmPassword,
        resetEmail,
        incomingResetToken,
    ) => {
        try {
            console.log('resetEmail:', resetEmail);
            setResettingPassword(true);
            const response = await postRequest(
                `${baseUrl}/api/user/reset-password`,
                {
                    password,
                    confirmPassword,
                    resetEmail,
                    incomingResetToken,
                },
            );
            if (response?.error) {
                toast.error(response.message);
                setResettingPassword(false);
            } else {
                toast.success(response.message);
                setResettingPassword(false);
                window.location.href = '/signin';
            }
        } catch (error) {
            console.error('An error occurred during password reset:', error);
            setResettingPassword(false);
        }
    };

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
                requestPasswordReset,
                resetPassword,
                resettingPassword,
                requestingPasswordReset,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
