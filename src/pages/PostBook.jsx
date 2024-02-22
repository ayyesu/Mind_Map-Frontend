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
import PdfUploader from '../components/PdfUploader';
import ImageUploader from '../components/ImageUploader';
import {BookContext} from '../context/BookContext';
import NavBar from '../components/NavBar';
import {FunctionContext} from '../context/functionContext';
import {Simplemde} from '../components/SimpleMde';

const PostBook = () => {
    const {
        updateBookInfo,
        bookInfo,
        handleAddingBook,
        handleImageUpload,
        handleFileUpload,
        addingBook,
    } = useContext(BookContext);

    const {currentTheme} = useContext(FunctionContext);

    return (
        <div
            className={`${
                currentTheme === 'dark' ? 'bg-slate-800 text-white' : ''
            }`}
        >
            <NavBar />
            <Container className='admin-container'>
                <div className='admin-logo '>
                    <img src='/img/logo.png' alt='logo' width='150px' />
                </div>
                <div className='admin-div'>
                    <div>
                        <h1 className='admin-header'>Create Post</h1>
                    </div>
                </div>

                <form onSubmit={handleAddingBook} className='admin-form'>
                    <TextField
                        label='Title'
                        name='title'
                        className='form-field'
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
                        className='form-field'
                        onChange={(e) => {
                            updateBookInfo({
                                ...bookInfo,
                                author: e.target.value,
                            });
                        }}
                    />
                    <span className='form-label'>Description:</span>
                    <Simplemde
                        onChange={(newDescription) => {
                            updateBookInfo({
                                ...bookInfo,
                                description: newDescription,
                            });
                        }}
                    />

                    <div className='pad-loading'>
                        <ImageUploader onImageSelect={handleImageUpload} />
                    </div>
                    <hr />
                    <div className='pad-loading'>
                        <PdfUploader onFileSelect={handleFileUpload} />
                    </div>
                    <FormControl>
                        <InputLabel>Category</InputLabel>
                        <Select
                            label='Category'
                            name='category'
                            className='form-field'
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
                        className='form-field'
                        onChange={(e) => {
                            updateBookInfo({
                                ...bookInfo,
                                price: e.target.value,
                            });
                        }}
                    />
                    <Button
                        disabled={addingBook}
                        type='submit'
                        variant='contained'
                        color='primary'
                    >
                        Create Post
                    </Button>
                </form>
            </Container>
        </div>
    );
};

export default PostBook;
