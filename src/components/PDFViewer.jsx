import React, {useContext} from 'react';
import {Worker} from '@react-pdf-viewer/core';
import {Viewer} from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import {FunctionContext} from '../context/functionContext';

const PDFViewer = ({pdfFile}) => {
    const {currentTheme} = useContext(FunctionContext);
    return (
        <div>
            <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js'>
                <Viewer fileUrl={pdfFile} />
            </Worker>
        </div>
    );
};

export default PDFViewer;
