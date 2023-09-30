import React, {useState} from 'react';
import {Button, Grid} from '@mui/material';

const ImageUploader = ({onImageSelect}) => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (event) => {
        const imageFile = event.target.files[0];

        // Check if a file was selected
        if (imageFile) {
            const reader = new FileReader();

            reader.onload = (e) => {
                setSelectedImage(e.target.result);
                onImageSelect(imageFile);
            };

            reader.readAsDataURL(imageFile);
        }
    };

    return (
        <Grid container spacing={2} alignItems='center'>
            <Grid item>
                <input
                    accept='image/*'
                    style={{display: 'none'}}
                    id='contained-button-image'
                    type='file'
                    onChange={handleImageChange}
                />
                <label htmlFor='contained-button-image'>
                    <Button
                        variant='contained'
                        color='primary'
                        component='span'
                    >
                        Upload Image
                    </Button>
                </label>
            </Grid>
            <Grid item>
                {selectedImage && (
                    <img
                        src={selectedImage}
                        alt='Selected'
                        style={{maxWidth: '100px', maxHeight: '100px'}}
                    />
                )}
            </Grid>
        </Grid>
    );
};

export default ImageUploader;
