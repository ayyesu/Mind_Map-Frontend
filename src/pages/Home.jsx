import React, {useContext, useState} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import NavBar from '../components/NavBar';
import {AuthContext} from '../context/AuthContext';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Link as RouterLink} from 'react-router-dom';
import {Link} from '@mui/material';
import BookCard from '../components/BookCard';
import Footer from '../components/Footer';
import {BookContext} from '../context/BookContext';

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

export default function Home() {
    const {user} = useContext(AuthContext);
    const {books, loading, searchQuery, setSearchQuery} =
        useContext(BookContext);
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
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <NavBar />
            <main>
                {/* Hero unit */}
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth='sm'>
                        <Typography
                            component='h1'
                            variant='h4'
                            align='center'
                            color='text.primary'
                            gutterBottom
                        >
                            {`Welcome ${user.user?.username}`}
                        </Typography>
                        <Typography
                            variant='h6'
                            align='center'
                            color='text.secondary'
                            paragraph
                        >
                            MindMap serves as your PDF file search engine.There
                            are no bothersome advertisements or download
                            constraints. Feel free to indulge in the content,
                            and remember to save it as a bookmark and share the
                            positive experience!
                        </Typography>
                    </Container>
                </Box>
                <Container
                    sx={{
                        py: 8,
                    }}
                    align='center'
                >
                    {/* End hero unit */}
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
                </Container>
            </main>

            {/* Pagination */}
            <Box sx={{textAlign: 'center', mt: 4, mb: 10}}>
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
            </Box>
            <Footer />
        </ThemeProvider>
    );
}
