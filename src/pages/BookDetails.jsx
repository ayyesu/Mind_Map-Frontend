import React, {useContext, useEffect, useState} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import NavBar from '../components/NavBar';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Link as RouterLink} from 'react-router-dom';
import {Link} from '@mui/material';
import Footer from '../components/Footer';
import {useParams} from 'react-router-dom';
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

export default function BookDetailsPage() {
    const {bookDetails, fetchSingleBook} = useContext(BookContext);
    const {bookId} = useParams();
    useEffect(() => {
        // Fetch a specific book when the component mounts
        fetchSingleBook(bookId);
    }, [bookId]);

    const [showFullDescription, setShowFullDescription] = useState(false);

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

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
                    <Container
                        className='book-detail'
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: '2rem',
                        }}
                    >
                        <div className='book-img' style={{marginRight: '2rem'}}>
                            <img
                                src={bookDetails.imageUrl}
                                alt='Book Cover'
                                className='book-cover'
                            />
                        </div>
                        <div className='side-detail'>
                            <p
                                className='title'
                                style={{
                                    fontSize: '1.5rem',
                                    fontWeight: 'bold',
                                    marginBottom: '0.5rem',
                                }}
                            >
                                {bookDetails.title}
                            </p>
                            <p
                                className='author'
                                style={{
                                    fontSize: '1rem',
                                    marginBottom: '0.5rem',
                                }}
                            >
                                By {bookDetails.author}
                            </p>
                            {showFullDescription ? (
                                <p className='description'>
                                    {bookDetails.description} <br />
                                    <span
                                        className='show-more'
                                        onClick={toggleDescription}
                                    >
                                        Show Less
                                    </span>
                                </p>
                            ) : (
                                <p className='description'>
                                    {bookDetails.description?.slice(0, 100)}...
                                    <span
                                        className='show-more'
                                        onClick={toggleDescription}
                                    >
                                        Show More
                                    </span>
                                </p>
                            )}
                            <p
                                className='price'
                                style={{
                                    fontSize: '1rem',
                                    fontWeight: 'bold',
                                    marginBottom: '0.5rem',
                                }}
                            >
                                {bookDetails.price}
                            </p>
                            <p
                                className='category'
                                style={{
                                    fontSize: '1rem',
                                    marginBottom: '0.5rem',
                                }}
                            >
                                {bookDetails.category}
                            </p>
                            <Link
                                component={RouterLink}
                                to={bookDetails.fileUrl}
                                download={bookDetails.fileUrl}
                                target='_blank'
                            >
                                <button className='download-btn'>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='16'
                                        height='16'
                                        fill='currentColor'
                                        class='bi bi-box-arrow-down'
                                        viewBox='0 0 16 16'
                                    >
                                        <path
                                            fill-rule='evenodd'
                                            d='M3.5 10a.5.5 0 0 1-.5-.5v-8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 0 0 1h2A1.5 1.5 0 0 0 14 9.5v-8A1.5 1.5 0 0 0 12.5 0h-9A1.5 1.5 0 0 0 2 1.5v8A1.5 1.5 0 0 0 3.5 11h2a.5.5 0 0 0 0-1h-2z'
                                        />
                                        <path
                                            fill-rule='evenodd'
                                            d='M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708l3 3z'
                                        />
                                    </svg>{' '}
                                    Preview
                                </button>
                            </Link>
                        </div>
                    </Container>
                </Box>
            </main>

            <Footer />
        </ThemeProvider>
    );
}