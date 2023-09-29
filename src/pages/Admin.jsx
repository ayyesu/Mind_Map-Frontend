import React, {useState, useEffect, useContext} from 'react';
import {
    Container,
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Typography,
    Grid,
} from '@mui/material';
import axios from 'axios';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import {toast} from 'react-toastify';
import PdfUploader from '../components/PdfUploader';
import ImageUploader from '../components/ImageUploader';
import {storage} from '../config/FirebaseConfig';
import {ref, uploadBytes} from 'firebase/storage';
import {BookContext} from '../context/BookContext';

const Admin = () => {
    const [] = useState('');

    const handleImageSelect = (imageFile) => {
        // Handle the selected image file here (e.g., upload it to a server)
        if (imageFile == null) return;

        const ImageRef = ref(storage, `images/${imageFile.name}`);
        uploadBytes(ImageRef, imageFile).then(() => {
            toast.success('Cover image uploaded successfully');
        });
    };

    const handleFileSelect = (file) => {
        // Handle the selected file here (e.g., save it to state or upload it)
        if (file == null) return;
        const FileRef = ref(storage, `files/${file.name}`);
        uploadBytes(FileRef, file).then((snapshot) => {
            toast.success('File uploaded successfully');
        });
    };

    const theme = createTheme({
        palette: {
            primary: {
                main: '#2196f3', // Blue color
            },
            background: {
                default: '#fff', // White color
            },
        },
    });

    const {updateBookInfo, bookInfo, handleAddingBook} =
        useContext(BookContext);

    return (
        <ThemeProvider theme={theme}>
            <Container className='admin-container'>
                <h1 className='admin-header'>Admin Console</h1>
                <form onSubmit={handleAddingBook} className='admin-form'>
                    <TextField
                        label='Title'
                        name='title'
                        onChange={(e) => {
                            updateBookInfo({
                                ...bookInfo,
                                title: e.target.value,
                            });
                        }}
                    />
                    <TextField
                        label='Author'
                        name='author'
                        onChange={(e) => {
                            updateBookInfo({
                                ...bookInfo,
                                author: e.target.value,
                            });
                        }}
                    />
                    <TextField
                        label='Description'
                        name='description'
                        multiline
                        rows={12}
                        onChange={(e) => {
                            updateBookInfo({
                                ...bookInfo,
                                description: e.target.value,
                            });
                        }}
                    />

                    <ImageUploader onImageSelect={handleImageSelect} />
                    <PdfUploader onFileSelect={handleFileSelect} />
                    <FormControl>
                        <InputLabel>Category</InputLabel>
                        <Select
                            label='Category'
                            name='category'
                            value={bookInfo.category || ''}
                            onChange={(e) => {
                                updateBookInfo({
                                    ...bookInfo,
                                    category: e.target.value,
                                });
                            }}
                        >
                            {[
                                'Personal Growth',
                                'Business',
                                'Technology',
                                'Art',
                                'Biology',
                                'Science & Research',
                                'Politics & History',
                            ].map((selectedCategory) => (
                                <MenuItem
                                    key={selectedCategory}
                                    value={selectedCategory}
                                >
                                    {selectedCategory}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        label='Price (GH₵)'
                        name='price'
                        onChange={(e) => {
                            updateBookInfo({
                                ...bookInfo,
                                price: e.target.value,
                            });
                        }}
                    />
                    <Button type='submit' variant='contained' color='primary'>
                        Add Book
                    </Button>
                </form>
            </Container>
        </ThemeProvider>
    );
};

export default Admin;
