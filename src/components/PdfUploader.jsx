import React, {useState} from 'react';
import {Button, Grid, Typography} from '@mui/material';

const PdfUploader = ({onFileSelect}) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        onFileSelect(file);
    };

    return (
        <Grid container spacing={2} alignItems='center'>
            <Grid item>
                <input
                    accept='application/pdf'
                    style={{display: 'none'}}
                    id='contained-button-file'
                    type='file'
                    onChange={handleFileChange}
                />
                <label htmlFor='contained-button-file'>
                    <Button
                        variant='contained'
                        color='primary'
                        component='span'
                    >
                        Upload PDF
                    </Button>
                </label>
            </Grid>
            <Grid item>
                {selectedFile && (
                    <Typography variant='body1'>{selectedFile.name}</Typography>
                )}
            </Grid>
        </Grid>
    );
};

export default PdfUploader;
