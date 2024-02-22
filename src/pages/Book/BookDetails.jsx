import React, {useContext, useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import {useParams} from 'react-router-dom';
import {BookContext} from '../../context/BookContext';
import moment from 'moment';
import Modal from 'react-modal';
import PDFViewer from '../../components/PDFViewer';
import Loading from './Loading';
import {FunctionContext} from '../../context/functionContext';
import PreviewSvg from '../../components/svg/Preview';
import DownloadSvg from '../../components/svg/Download';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function BookDetailsPage() {
    const {bookDetails, fetchSingleBook, fetchingBook} =
        useContext(BookContext);
    const {currentTheme} = useContext(FunctionContext);
    const {bookId} = useParams();
    const abortController = new AbortController();
    useEffect(() => {
        // Fetch a specific book when the component mounts
        fetchSingleBook(bookId);

        return () => {
            abortController.abort();
        };
    }, [bookId]);

    const onDownloadbtnClick = () => {
        window.open(bookDetails.fileUrl, '_blank');
    };

    const [showFullDescription, setShowFullDescription] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false); // State for modal

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    if (fetchingBook) {
        return <Loading />;
    }

    return (
        <div>
            <NavBar />
            <div
                className={`${
                    currentTheme === 'dark' ? 'bg-slate-800 text-white' : ''
                } min-h-screen `}
            >
                {/* Hero unit */}
                <Box
                    style={{backgroundColor: '#2196f32e', minHeight: '100vh'}}
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
                                    fontSize: '1.2rem',
                                    fontWeight: 'bold',
                                    marginBottom: '0.5rem',
                                }}
                            >
                                {bookDetails.title}
                            </p>
                            <pre
                                className='author'
                                style={{
                                    fontSize: '1rem',
                                    marginBottom: '0.5rem',
                                    fontFamily: 'Inter',
                                }}
                            >
                                By {bookDetails.author}
                            </pre>
                            <pre
                                style={{
                                    fontFamily: 'Inter',
                                }}
                            >
                                Last Updated:{' '}
                                <span>
                                    {moment(bookDetails.createdAt).calendar()}
                                </span>
                            </pre>
                            {showFullDescription ? (
                                <pre
                                    className={`${
                                        currentTheme === 'dark' && ''
                                    } text-base mb-1 h-40 overflow-y-auto pr-2 font-inter whitespace-pre-wrap py-4 px-6  border border-gray-300`}
                                >
                                    <div className='text-sm'>
                                        <Markdown remarkPlugins={[remarkGfm]}>
                                            {bookDetails.description}
                                        </Markdown>
                                    </div>
                                    <br />
                                    <span
                                        className='show-more'
                                        onClick={toggleDescription}
                                    >
                                        Show Less
                                    </span>
                                </pre>
                            ) : (
                                <pre
                                    className={`${
                                        currentTheme === 'dark' && ''
                                    }text-base mb-1 h-40 overflow-y-auto pr-2 font-inter whitespace-pre-wrap py-4 px-6  border border-gray-300`}
                                >
                                    <div className='text-sm'>
                                        <Markdown remarkPlugins={[remarkGfm]}>
                                            {bookDetails.description?.slice(
                                                0,
                                                100,
                                            ) + '...'}
                                        </Markdown>
                                    </div>
                                    <span
                                        className='show-more'
                                        onClick={toggleDescription}
                                    >
                                        Show More
                                    </span>
                                </pre>
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
                            <div className='book-detail-btn'>
                                <div>
                                    <button
                                        className='download-btn flex gap-2'
                                        onClick={() => openModal()}
                                    >
                                        <PreviewSvg /> <span>Preview</span>
                                    </button>
                                </div>
                                <div>
                                    <button
                                        className='download-btn flex gap-2'
                                        onClick={onDownloadbtnClick}
                                    >
                                        <DownloadSvg /> <span>Download</span>
                                    </button>
                                </div>
                            </div>
                            {/* Modal for PDF Preview */}
                            <Modal
                                isOpen={modalIsOpen}
                                onRequestClose={closeModal}
                                contentLabel={bookDetails.title}
                            >
                                <button
                                    title='Close'
                                    className='delete-icon'
                                    onClick={closeModal}
                                >
                                    x
                                </button>
                                <PDFViewer pdfFile={bookDetails.fileUrl} />
                            </Modal>
                        </div>
                    </Container>
                </Box>
            </div>
            <Footer />
        </div>
    );
}
