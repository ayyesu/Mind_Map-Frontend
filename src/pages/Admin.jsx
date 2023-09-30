import React, {useContext} from 'react';
import {
    Container,
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material';
import {ThemeProvider, createTheme} from '@mui/material/styles';
// import {toast} from 'react-toastify';
import PdfUploader from '../components/PdfUploader';
import ImageUploader from '../components/ImageUploader';
import {BookContext} from '../context/BookContext';

const Admin = () => {
    const defaultTheme = createTheme({
        palette: {
            primary: {
                main: '#8d6e63', // Use a shade of brown for the primary color
            },
            secondary: {
                main: '#a1887f', // Use a lighter shade of brown for the secondary color
            },
            background: {
                default: '#f5e0cb', // Use a light brown for the background color
            },
        },
    });

    const {
        updateBookInfo,
        bookInfo,
        handleAddingBook,
        imageUrl,
        fileUrl,
        handleImageUpload,
        handleFileUpload,
    } = useContext(BookContext);

    return (
        <ThemeProvider theme={defaultTheme}>
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

                    <ImageUploader onImageSelect={handleImageUpload} />
                    <PdfUploader onFileSelect={handleFileUpload} />
                    <TextField
                        label='Image Url'
                        name='imageUrl'
                        value={imageUrl || ''}
                        onChange={(e) => {
                            updateBookInfo({
                                ...bookInfo,
                                imageUrl: e.target.value,
                            });
                        }}
                    />
                    <TextField
                        label='File Url'
                        name='fileUrl'
                        value={fileUrl || ''}
                        onChange={(e) => {
                            updateBookInfo({
                                ...bookInfo,
                                fileUrl: e.target.value,
                            });
                        }}
                    />
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
