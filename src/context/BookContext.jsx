import {createContext, useState, useCallback, useEffect} from 'react';
import {baseUrl, postRequest, getRequest} from '../utils/Service';
import {toast} from 'react-toastify';

export const BookContext = createContext();

export const BookContextProvider = ({children}) => {
    const [addingBook, setAddingBook] = useState(false);
    const [bookDetails, setBookDetails] = useState([]);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [bookInfo, setBookInfo] = useState({
        title: '',
        author: '',
        description: '',
        category: '',
        price: '',
    });

    const updateBookInfo = useCallback((info) => {
        setBookInfo(info);
    });

    useEffect(() => {
        const fetchBooks = async () => {
            const url = `${baseUrl}/api/books`;
            const response = await getRequest(url);

            if (!response.error) {
                setBooks(response);
            }
            setLoading(false);
        };

        fetchBooks();
    }, []);

    const handleAddingBook = useCallback(
        async (e) => {
            e.preventDefault();
            setAddingBook(true);
            try {
                const response = await postRequest(
                    `${baseUrl}/api/books/addbook`,
                    JSON.stringify(bookInfo),
                );
                setAddingBook(false);
                console.log('response', response);
                if (response?.error) {
                    toast.error(response?.message);
                } else {
                    toast.success('Book Added Successfully');
                    setBookDetails((prev) => [...prev, response]);
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
                books,
                loading,
                bookInfo,
                updateBookInfo,
                addingBook,
            }}
        >
            {children}
        </BookContext.Provider>
    );
};
