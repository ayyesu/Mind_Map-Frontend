import React, {useContext, useState, useEffect} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import NavBar from '../components/NavBar';
import {AuthContext} from '../context/AuthContext';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import BookCard from '../components/BookCard';
import {ref, listAll, getDownloadURL} from 'firebase/storage';
import {storage} from '../config/FirebaseConfig';

function Copyright() {
    return (
        <Typography variant='body2' color='text.secondary' align='center'>
            {'Copyright © '}
            <Link color='inherit' href='https://mui.com/'>
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const cards = [1];

const defaultTheme = createTheme();

export default function Album() {
    const {user} = useContext(AuthContext);
    const [page, setPage] = useState(1); // Track the current page
    const [perPage] = useState(6); // Number of items per page
    const [totalPages, setTotalPages] = useState(1);
    const [fileUrls, setFileUrls] = useState([]);

    const ImageListRef = ref(storage, 'images/');

    useEffect(() => {
        listAll(ImageListRef).then((response) => {
            const totalFiles = response.items.length;
            setTotalPages(Math.ceil(totalFiles / perPage));
            const startIdx = (page - 1) * perPage;
            const endIdx = startIdx + perPage;

            const promises = response.items
                .slice(startIdx, endIdx)
                .map((item) => getDownloadURL(item));

            Promise.all(promises).then((urls) => {
                setFileUrls(urls);
            });
        });
    }, [page, perPage]);

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
                            variant='h2'
                            align='center'
                            color='text.primary'
                            gutterBottom
                        >
                            {`Welcome ${user.user?.username}`}
                        </Typography>
                        <Typography
                            variant='h5'
                            align='center'
                            color='text.secondary'
                            paragraph
                        >
                            MindMap serves as your PDF file search engine. At
                            present, we offer access to 84,816,312 eBooks
                            available for free download. There are no bothersome
                            advertisements or download constraints. Feel free to
                            indulge in the content, and remember to save it as a
                            bookmark and share the positive experience!
                        </Typography>
                    </Container>
                </Box>
                <Container sx={{py: 8}} maxWidth='md'>
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {fileUrls.map((url, index) => (
                            <Grid item key={index} xs={12} sm={6} md={4}>
                                <BookCard imageUrl={url} />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>

            {/* Pagination */}
            <Box sx={{textAlign: 'center', mt: 4}}>
                <Button
                    variant='contained'
                    color='primary'
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                >
                    Previous Page
                </Button>
                <Button
                    variant='contained'
                    color='primary'
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                >
                    Next Page
                </Button>
            </Box>
        </ThemeProvider>
    );
}
