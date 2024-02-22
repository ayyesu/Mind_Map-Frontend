import {createContext, useState} from 'react';
import {baseUrl, postRequest} from '../utils/Service';
import {toast} from 'react-toastify';

export const FunctionContext = createContext();

export const FunctionContextProvider = ({children}) => {
    // Waitlist
    const [joiningWaitlist, setJoininghWaitlist] = useState(false);
    const [waitlistError, setWaitlistError] = useState('');
    const [waitlistJoined, setWaitlistJoined] = useState(false);

    const [currentTheme, setCurrentTheme] = useState(
        localStorage.theme || 'light',
    );

    // Joining Waitlist
    const joinWaitlist = async (email) => {
        try {
            setJoininghWaitlist(true);
            const response = await postRequest(`${baseUrl}/api/waitlist`, {
                email,
            });

            if (response.error) {
                toast.error(response.message, {
                    pauseOnHover: false,
                });
                setWaitlistJoined(true);
            } else {
                toast.success(response.message, {
                    pauseOnHover: false,
                });
                setWaitlistJoined(true);
            }

            setJoininghWaitlist(false);
        } catch (error) {
            console.error('Error adding to waitlist:', error);
            setJoininghWaitlist(false);
        }
    };

    // Theme functionality
    const handleThemeChange = () => {
        if (
            localStorage.theme === 'dark' ||
            (!('theme' in localStorage) &&
                window.matchMedia('(prefers-color-scheme: dark)').matches)
        ) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    const setTheme = (theme) => {
        localStorage.theme = theme;
        setCurrentTheme(localStorage.theme);
        handleThemeChange();
    };

    return (
        <FunctionContext.Provider
            value={{
                joinWaitlist,
                joiningWaitlist,
                waitlistError,
                waitlistJoined,
                handleThemeChange,
                setTheme,
                currentTheme,
            }}
        >
            {children}
        </FunctionContext.Provider>
    );
};
