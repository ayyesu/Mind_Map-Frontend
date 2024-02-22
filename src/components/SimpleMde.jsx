import React, {useContext} from 'react';
import SimpleMdeReact from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import {FunctionContext} from '../context/functionContext';

export const Simplemde = ({onChange}) => {
    const {currentTheme} = useContext(FunctionContext);
    return (
        <SimpleMdeReact
            className={`${
                currentTheme === 'dark' ? 'bg-slate-800 text-white' : ''
            }  `}
            onChange={onChange}
        />
    );
};
