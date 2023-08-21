import {createContext, useCallback, useEffect, useState} from 'react';
import {baseUrl, postRequest} from '../utils/Service';
import {toast} from 'react-toastify';

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [signingup, setSigningUp] = useState(false);
    const [registrationError, setRegistrationError] = useState(null);
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

    useEffect(() => {
        try {
            const user = localStorage.getItem('User');
            if (user) {
                const parsedUser = JSON.parse(user);
                setUser(parsedUser);
            }
        } catch (error) {
            // Handle any potential parsing errors or other issues
            console.error('Error retrieving and parsing user data:', error);
        }
    }, []);

    const registerUser = useCallback(
        async (e) => {
            e.preventDefault();
            setSigningUp(true);
            try {
                const response = await postRequest(
                    `${baseUrl}/signup`,
                    JSON.stringify(registerInfo),
                );
                console.log(response);
                setSigningUp(false);
                if (response?.error) {
                    setRegistrationError(response.message);
                    toast.error(response.message);
                } else {
                    localStorage.setItem('User', JSON.stringify(response));
                    toast.success('Registration successful');
                    setUser(response);
                    setRegistrationError(null);
                }
            } catch (error) {
                console.error('An error occurred during registration:', error);
                setSigningUp(false);
                setRegistrationError('An error occurred during registration.');
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
                registrationError,
                signingup,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
