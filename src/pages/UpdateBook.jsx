import React, {useContext, useState, useEffect} from 'react';
import {
    Container,
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material';
import {BookContext} from '../context/BookContext';
import {useParams} from 'react-router-dom';
import NavBar from '../components/NavBar';
import {FunctionContext} from '../context/functionContext';
import {Simplemde} from '../components/SimpleMde';
import 'easymde/dist/easymde.min.css';
import LoadingButton from '../components/svg/LoadingButton';
import PageLoading from '../components/PageLoading';

const UpdateBook = () => {
    const {
        updateBookInfo,
        bookInfo,
        handleUpdateBook,
        fetchSingleBook,
        updatingBook,
    } = useContext(BookContext);

    const {currentTheme} = useContext(FunctionContext);

    console.log('Book Info', bookInfo);

    const [loaded, setLoaded] = useState(false);

    // fetch bookId from params
    const {bookId} = useParams();

    useEffect(() => {
        let isMounted = true;

        const fetchDetails = async () => {
            await fetchSingleBook(bookId);
            if (isMounted) {
                setLoaded(true);
            }
        };

        fetchDetails();

        return () => {
            isMounted = false;
        };
    }, [bookId]);

    const updateBook = async (bookId, bookInfo) => {
        await handleUpdateBook(bookId, bookInfo);
    };

    if (!loaded) {
        return <PageLoading />;
    }

    return (
        <div
            className={`${
                currentTheme === 'dark' ? 'bg-slate-800 text-white ' : ''
            } `}
        >
            <NavBar />
            <Container className='admin-container'>
                <div className='admin-logo '>
                    <img src='/img/logo.png' alt='logo' width='150px' />
                </div>
                <div className='admin-div'>
                    <div>
                        <h1 className='admin-header'>Update Post</h1>
                    </div>
                </div>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        updateBook(bookId, bookInfo);
                    }}
                    className='admin-form'
                >
                    <TextField
                        label='Title'
                        name='title'
                        value={bookInfo.title}
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
                        value={bookInfo.author}
                        className='form-field'
                        onChange={(e) => {
                            updateBookInfo({
                                ...bookInfo,
                                author: e.target.value,
                            });
                        }}
                    />

                    <Simplemde
                        onChange={(newDescription) => {
                            updateBookInfo({
                                ...bookInfo,
                                description: newDescription,
                            });
                        }}
                    />

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

                    <Button
                        disabled={updatingBook}
                        type='submit'
                        variant='contained'
                        color='primary'
                    >
                        {updatingBook ? <LoadingButton /> : 'Save Changes'}
                    </Button>
                </form>
            </Container>
        </div>
    );
};

export default UpdateBook;
