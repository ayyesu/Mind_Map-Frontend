import React, {useState} from 'react';
import {useContext} from 'react';
import {useParams} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';
import LoadingButton from '../components/svg/LoadingButton';

const PasswordReset = () => {
    const {token} = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const {resetPassword, resettingPassword} = useContext(AuthContext);

    const incomingResetToken = token.slice(6);

    const handleResetPassword = async () => {
        console.log('Reset token:', incomingResetToken);
        if (!incomingResetToken) {
            setError('Invalid or expired reset token.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        const resetEmail = localStorage.getItem('resetEmail');

        await resetPassword(
            password,
            confirmPassword,
            resetEmail,
            incomingResetToken,
        );
    };

    return (
        <div className='min-h-screen flex flex-col items-center justify-center bg-blue-500 py-12 px-4 sm:px-6 lg:px-8'>
            <h2 className='text-center text-3xl font-extrabold text-white mb-6'>
                Change Password
            </h2>
            {error && <div className='text-red-500 mb-4'>{error}</div>}
            <input
                type='password'
                placeholder='Enter new password'
                value={password}
                className='appearance-none rounded-none relative block w-60 px-3 py-2 border border-white placeholder-black text-black rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm'
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                type='password'
                placeholder='Confirm new password'
                value={confirmPassword}
                className='appearance-none mt-4 rounded-none relative block w-60 px-3 py-2 border border-white placeholder-black text-black rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm'
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
                className='group relative mt-6 w-60 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                disabled={resettingPassword}
                onClick={handleResetPassword}
            >
                {resettingPassword ? <LoadingButton /> : 'Reset Password'}
            </button>
        </div>
    );
};

export default PasswordReset;
