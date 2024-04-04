import React, {useState, useContext} from 'react';
import {AuthContext} from '../context/AuthContext';
import LoadingButton from '../components/svg/LoadingButton';

const ResetPasswordEmailRequest = () => {
    const [email, setEmail] = useState('');

    const {requestPasswordReset, requestingPasswordReset} =
        useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        await requestPasswordReset(email);
    };
    return (
        <div className='min-h-screen flex items-center justify-center bg-blue-500 py-12 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-md w-full space-y-8'>
                <div>
                    <h2 className='mt-6 text-center text-3xl font-extrabold text-white'>
                        Reset Your Password
                    </h2>
                </div>
                <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
                    <input type='hidden' name='remember' defaultValue='true' />
                    <div className='rounded-md shadow-sm -space-y-px'>
                        <div>
                            <label htmlFor='email-address' className='sr-only'>
                                Email address
                            </label>
                            <input
                                id='email-address'
                                name='email'
                                type='email'
                                autoComplete='email'
                                required
                                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-white placeholder-black text-black rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm'
                                placeholder='Email address'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type='submit'
                            disabled={requestingPasswordReset}
                            className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                        >
                            {requestingPasswordReset ? (
                                <LoadingButton />
                            ) : (
                                'Reset Password'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordEmailRequest;
