import {createContext, useState} from 'react';
import {baseUrl, postRequest} from '../utils/Service';
import {toast} from 'react-toastify';

export const FunctionContext = createContext();

export const FunctionContextProvider = ({children}) => {
    const [joiningWaitlist, setJoininghWaitlist] = useState(false);
    const [waitlistError, setWaitlistError] = useState('');
    const [waitlistJoined, setWaitlistJoined] = useState(false);

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

    return (
        <FunctionContext.Provider
            value={{
                joinWaitlist,
                joiningWaitlist,
                waitlistError,
                waitlistJoined,
            }}
        >
            {children}
        </FunctionContext.Provider>
    );
};
