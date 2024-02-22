import React from 'react';
import SimpleMdeReact from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

export const Simplemde = ({onChange}) => {
    return <SimpleMdeReact onChange={onChange} />;
};
