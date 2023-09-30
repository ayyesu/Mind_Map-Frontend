import {createContext, useState, useCallback, useEffect} from 'react';
import {
    baseUrl,
    postRequest,
    getRequest,
    filePostRequest,
} from '../utils/Service';
import {toast} from 'react-toastify';

export const BookContext = createContext();

export const BookContextProvider = ({children}) => {
    const [addingBook, setAddingBook] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [imageLinkLoading, setImageLinkLoading] = useState(false);
    const [fileLinkLoading, setFileLinkLoading] = useState(false);
    const [fileUrl, setFileUrl] = useState('');
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    const [bookInfo, setBookInfo] = useState({
        title: '',
        author: '',
        description: '',
        category: '',
        price: '',
        imageUrl,
        fileUrl,
    });

    console.log('Book Info', bookInfo);

    const updateBookInfo = useCallback((info) => {
        setBookInfo(info);
    }, []);

    useEffect(() => {
        const fetchBooks = async () => {
            const url = `${baseUrl}/api/books`;
            const response = await getRequest(url);

            if (!response.error) {
                setBooks(response);
                console.log('response', response);
            }
            setLoading(false);
        };

        fetchBooks();
    }, []);

    const handleImageUpload = async (file) => {
        if (file == null) return;
        const formData = new FormData();
        formData.append('file', file);
        setImageLinkLoading(true);
        console.log('formData', formData);

        const response = await filePostRequest(
            `${baseUrl}/api/image/upload`,
            formData,
        );
        console.log('image post response', response);
        if (response?.error) {
            toast.error(response?.message);
            setImageLinkLoading(false);
        } else {
            console.log('response-url', response.downloadURL);
            setImageUrl(response.downloadURL);
            setImageLinkLoading(false);
            toast.success('Image Uploaded Successfully');
        }
    };

    const handleFileUpload = async (file) => {
        if (file == null) return;
        const formData = new FormData();
        formData.append('file', file);
        setFileLinkLoading(true);

        const response = await filePostRequest(
            `${baseUrl}/api/file/upload`,
            formData,
        );
        console.log('response', response);
        if (response?.error) {
            toast.error(response?.message);
            setFileLinkLoading(false);
        } else {
            setFileUrl(response.downloadURL);
            setFileLinkLoading(false);
            toast.success('Image Uploaded Successfully');
        }
    };

    const handleAddingBook = useCallback(
        async (e) => {
            e.preventDefault();
            setAddingBook(true);

            try {
                const response = await postRequest(
                    `${baseUrl}/api/books/addbook`,
                    JSON.stringify({...bookInfo, imageUrl, fileUrl}),
                );
                setAddingBook(false);
                console.log('response', response);
                if (response?.error) {
                    toast.error(response?.message);
                } else {
                    toast.success('Book Added Successfully');
                }
            } catch (error) {
                console.error('An error occurred adding book:', error);
                setAddingBook(false);
            }
        },
        [bookInfo],
    );

    return (
        <BookContext.Provider
            value={{
                handleAddingBook,
                handleImageUpload,
                handleFileUpload,
                imageUrl,
                fileUrl,
                setImageUrl,
                books,
                loading,
                bookInfo,
                updateBookInfo,
                imageLinkLoading,
                fileLinkLoading,
                addingBook,
            }}
        >
            {children}
        </BookContext.Provider>
    );
};
