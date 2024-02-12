import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Loading = () => {
    return (
        <div>
            <CssBaseline />
            <NavBar />
            <div className='book-detail-body'>
                <Box
                    style={{backgroundColor: '#2196f32e'}}
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
                            <Skeleton
                                className='book-cover'
                                width={200}
                                height={300}
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
                                <Skeleton width={200} />
                            </p>
                            <pre
                                className='author'
                                style={{
                                    fontSize: '1rem',
                                    marginBottom: '0.5rem',
                                }}
                            >
                                <Skeleton width={150} />
                            </pre>
                            <pre className='description'>
                                <Skeleton count={3} />
                            </pre>
                            <Skeleton />
                            <p
                                className='price'
                                style={{
                                    fontSize: '1rem',
                                    fontWeight: 'bold',
                                    marginBottom: '0.5rem',
                                }}
                            >
                                <Skeleton width={100} />
                            </p>
                            <p
                                className='category'
                                style={{
                                    fontSize: '1rem',
                                    marginBottom: '0.5rem',
                                }}
                            >
                                <Skeleton />
                            </p>
                            <div className='book-detail-btn'>
                                <div>
                                    <Skeleton width={100} />
                                </div>
                                <div>
                                    <Skeleton width={100} />
                                </div>
                            </div>
                        </div>
                    </Container>
                </Box>
            </div>
            <Footer />
        </div>
    );
};

export default Loading;
