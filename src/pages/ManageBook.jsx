import React, {useContext, useEffect, useState} from 'react';
import {BookContext} from '../context/BookContext';
import {Button, Typography} from '@mui/material';
import NavBar from '../components/NavBar';
import {useParams, useNavigate, Link as RouterLink} from 'react-router-dom';
import {Link} from '@mui/material';
import {FunctionContext} from '../context/functionContext';
import DeleteSvg from '../components/svg/Delete';
import UpdateSvg from '../components/svg/Update';

const ManageBook = () => {
    const abortController = new AbortController();
    const {userBooks, fetchUserBooks, handleDeleteBook, handleUpdateBook} =
        useContext(BookContext);

    const navigate = useNavigate();

    const {currentTheme} = useContext(FunctionContext);

    const {userId} = useParams();

    useEffect(() => {
        fetchUserBooks(userId);

        return () => {
            abortController.abort();
        };
    }, [userId]);

    const confirmDelete = (bookId) => {
        const confirmDelete = window.confirm(
            'Are you sure you want to delete this book?',
        );
        if (confirmDelete) {
            handleDeleteBook(bookId);
        }
    };

    const textSlice = (text) => {
        if (text.length > 15) {
            return text.slice(0, 15) + '...';
        }
        return text;
    };

    const redirectToUpdate = (bookId) => {
        // Redirect to update book route with bookId as parameter
        navigate(`/update-book/${bookId}`);
    };

    return (
        <div
            className={`${
                currentTheme === 'dark' ? 'bg-slate-800 text-white ' : ''
            }`}
        >
            <NavBar />
            <div className='h-screen'>
                <h2 className='flex sm:justify-center sm:items-center mt-20 font-inter admin-header'>
                    Manage Books
                </h2>
                {userBooks.length === 0 ? (
                    <div className='flex justify-center items-center h-1/2 font-inter'>
                        <Typography variant='h6'>No Books Uploaded</Typography>
                    </div>
                ) : (
                    <div className='flex justify-center items-center  flex-wrap w-90vw mx-auto mt-4 p-10'>
                        <table className='table-auto border-separate border-spacing-2'>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>Date Added</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userBooks.map((book) => (
                                    <tr key={book._id}>
                                        <td>
                                            <Link
                                                component={RouterLink}
                                                to={`/book/${book._id}`}
                                                sx={{textDecoration: 'none'}}
                                            >
                                                {book.title}
                                            </Link>
                                        </td>
                                        <td>{textSlice(book.author)}</td>
                                        <td>
                                            {new Date(
                                                book.createdAt,
                                            ).toLocaleDateString()}
                                        </td>
                                        <td>
                                            <Button
                                                onClick={() =>
                                                    redirectToUpdate(book._id)
                                                }
                                                variant='outlined'
                                                color='primary'
                                                fontFamily={'Inter'}
                                            >
                                                <UpdateSvg />
                                            </Button>{' '}
                                            <Button
                                                onClick={() =>
                                                    confirmDelete(book._id)
                                                }
                                                variant='outlined'
                                                color='error'
                                                fontFamily={'Inter'}
                                            >
                                                <DeleteSvg />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageBook;
