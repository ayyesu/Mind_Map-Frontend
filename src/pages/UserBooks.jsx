import React, {useContext, useEffect, useState} from 'react';
import {BookContext} from '../context/BookContext';
import {
    Button,
    Card,
    CardContent,
    CardActions,
    Typography,
    CardMedia,
} from '@mui/material';
import NavBar from '../components/NavBar';
import {useParams} from 'react-router-dom';
import Modal from 'react-modal';
import UpdateBook from '../components/UpdateBook';

const UserBooks = () => {
    const {userBooks, fetchUserBooks, handleDeleteBook, handleUpdateBook} =
        useContext(BookContext);
    const [modalIsOpen, setModalIsOpen] = useState(false); // State for modal

    const {userId} = useParams();

    useEffect(() => {
        fetchUserBooks(userId);
    }, [userId]);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const confirmDelete = (bookId) => {
        const confirmDelete = window.confirm(
            'Are you sure you want to delete this book?',
        );
        if (confirmDelete) {
            handleDeleteBook(bookId);
        }
    };

    return (
        <div>
            <NavBar />
            <div>
                <h2
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: '20px',
                        fontFamily: 'Inter',
                    }}
                >
                    Manage Books
                </h2>
                {userBooks.length == 0 ? (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '50vh',
                            fontFamily: 'Inter',
                        }}
                    >
                        <Typography variant='h6'>No Books Uploaded</Typography>
                    </div>
                ) : (
                    <div className='userBook-area'>
                        {userBooks.map((book) => (
                            <Card
                                key={book._id}
                                style={{
                                    maxWidth: 245,
                                    margin: '10px',
                                    cursor: 'pointer',
                                    transition: 'transform 0.3s ease-in-out',
                                    fontFamily: 'Inter',
                                }}
                                className='card-hover'
                            >
                                <CardMedia
                                    component='img'
                                    loading='lazy'
                                    alt={book.title}
                                    title={book.title}
                                    height='140'
                                    image={book.imageUrl}
                                />
                                <CardContent>
                                    <Typography
                                        fontFamily={'Inter'}
                                        variant='h6'
                                    >
                                        {book.title.slice(0, 20) + '...'}
                                    </Typography>
                                    <Typography
                                        variant='body2'
                                        color='text.secondary'
                                        fontFamily={'Inter'}
                                    >
                                        Author: {book.author}
                                    </Typography>
                                    <Typography
                                        variant='body2'
                                        fontFamily={'Inter'}
                                        color='text.secondary'
                                    >
                                        Date Added:{' '}
                                        {new Date(
                                            book.createdAt,
                                        ).toLocaleDateString()}
                                    </Typography>
                                </CardContent>
                                <Modal
                                    isOpen={modalIsOpen}
                                    onRequestClose={closeModal}
                                    contentLabel={book.title}
                                >
                                    <button
                                        title='Close'
                                        className='delete-icon'
                                        onClick={closeModal}
                                    >
                                        x
                                    </button>
                                    <UpdateBook bookId={book._id} />
                                </Modal>
                                <CardActions>
                                    <Button
                                        onClick={() => openModal()}
                                        variant='outlined'
                                        color='primary'
                                        fontFamily={'Inter'}
                                    >
                                        Update
                                    </Button>
                                    <Button
                                        onClick={() => confirmDelete(book._id)}
                                        variant='outlined'
                                        color='error'
                                        fontFamily={'Inter'}
                                    >
                                        Delete
                                    </Button>
                                </CardActions>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserBooks;
