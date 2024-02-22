import React, {useContext, useState} from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import NavBar from '../components/NavBar';
import {AuthContext} from '../context/AuthContext';
import {Link as RouterLink} from 'react-router-dom';
import {Link} from '@mui/material';
import BookCard from '../components/BookCard';
import Footer from '../components/Footer';
import {BookContext} from '../context/BookContext';
import {FunctionContext} from '../context/functionContext';

export default function Home() {
    const {user} = useContext(AuthContext);
    const {books, loading, searchQuery} = useContext(BookContext);
    const {currentTheme} = useContext(FunctionContext);
    const [page, setPage] = useState(1);

    // Filter books based on search query
    const filteredBooks = books.filter(
        (book) =>
            book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.description
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            book.author.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const itemsPerPage = 6;
    const totalFilteredBooks = filteredBooks.length;

    // Calculate pagination for filtered books
    const totalPages = Math.ceil(totalFilteredBooks / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalFilteredBooks);

    // Update the currentBooks to use filteredBooks
    const currentBooks = filteredBooks.slice(startIndex, endIndex);

    if (loading) {
        return (
            <div className='loading-tab'>
                <div className='loadingio-spinner-dual-ring-zrf4k050kg8'>
                    <div className='ldio-moow989lncj'>
                        <div></div>
                        <div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`${currentTheme === 'dark' ? 'bg-slate-800' : ''} `}>
            <NavBar />
            <div>
                <Box
                    sx={{
                        pt: 8,
                        pb: 6,
                    }}
                    className={`${
                        currentTheme === 'dark' ? 'bg-slate-800 text-white' : ''
                    }`}
                >
                    <Container maxWidth='sm'>
                        <Typography
                            component='h1'
                            variant='h4'
                            align='center'
                            style={{
                                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                border: '2px solid #87CEFA',
                                color: 'text.secondary',
                                fontFamily: 'Inter',
                            }}
                            gutterBottom
                        >
                            Welcome <span>{` ${user.user?.username}`}</span>
                        </Typography>
                        <Typography
                            align='center'
                            color={`${
                                currentTheme === 'dark' ? '' : 'textSecondary'
                            }`}
                        >
                            MindMap serves as your Ebook file search
                            engine.There are currently{' '}
                            <span
                                className={`${
                                    currentTheme === 'light' ||
                                    ('' && 'bg-gray-100')
                                }text-lg mb-1 h-36 overflow-y-auto pr-2 font-inter whitespace-pre-wrap  border border-blue-500`}
                            >
                                {books.length}
                            </span>{' '}
                            Ebooks available with no bothersome advertisements
                            or download constraints. Feel free to indulge in the
                            content, and remember to save it as a bookmark and
                            share the positive experience!
                        </Typography>
                    </Container>
                </Box>
            </div>
            <div className='book-area'>
                <Container
                    sx={{
                        py: 8,
                    }}
                    align='center'
                >
                    {/* End hero unit */}

                    {currentBooks.length === 0 ? (
                        <div className='nothing-to-show dark:bg-slate-800'>
                            <img
                                className='nothing-gif'
                                loading='lazy'
                                height={80}
                                width={80}
                                src='/img/nothing_to_show.gif'
                            />
                            <h4 className='nothing-text'>Nothing to show...</h4>
                        </div>
                    ) : (
                        <Grid container spacing={4} width='100%'>
                            {currentBooks.map((book) => (
                                <Grid item key={book._id} xs={12} sm={6} md={4}>
                                    <Link
                                        component={RouterLink}
                                        to={`/book/${book._id}`}
                                        sx={{textDecoration: 'none'}}
                                    >
                                        <BookCard
                                            imageUrl={book.imageUrl}
                                            title={book.title}
                                            description={book.description}
                                        />
                                    </Link>
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </Container>
            </div>

            {/* Pagination */}
            <Box sx={{textAlign: 'center', mt: 4, mb: 10}}>
                {currentBooks.length > 0 && (
                    <div>
                        <Button
                            variant='contained'
                            color='primary'
                            disabled={page === 1}
                            onClick={() => setPage(page - 1)}
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='16'
                                height='16'
                                fill='currentColor'
                                className='bi bi-arrow-left'
                                viewBox='0 0 16 16'
                            >
                                <path
                                    fillRule='evenodd'
                                    d='M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z'
                                />
                            </svg>{' '}
                            Previous
                        </Button>
                        <Button
                            variant='contained'
                            style={{marginLeft: '1rem'}}
                            color='primary'
                            disabled={page === totalPages}
                            onClick={() => setPage(page + 1)}
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='16'
                                height='16'
                                fill='currentColor'
                                className='bi bi-arrow-right'
                                viewBox='0 0 16 16'
                            >
                                <path
                                    fillRule='evenodd'
                                    d='M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z'
                                />
                            </svg>{' '}
                            Next
                        </Button>
                    </div>
                )}
            </Box>
            <Footer />
        </div>
    );
}
