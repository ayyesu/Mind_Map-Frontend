import * as React from 'react';
import Typography from '@mui/material/Typography';
import {useContext} from 'react';
import {FunctionContext} from '../context/functionContext';

export default function Footer(props) {
    const {currentTheme} = useContext(FunctionContext);
    return (
        <Typography
            variant='body2'
            color='text.secondary'
            className={` ${
                currentTheme === 'dark' && 'bg-slate-800 text-white'
            }fixed bottom-0 left-0 w-full   text-center py-4`}
            align='center'
            {...props}
        >
            <span className={` ${currentTheme === 'dark' && ' text-white'}`}>
                {'Copyright © '}
                {new Date().getFullYear()}
                {'.'}
            </span>
        </Typography>
    );
}
