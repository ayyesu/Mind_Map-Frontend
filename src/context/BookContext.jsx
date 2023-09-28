import {createContext, useState, useCallback} from 'react';
import {baseUrl, postRequest} from '../utils/Service';
import {toast} from 'react-toastify';

export const BookContext = createContext();

export const BookContextProvider = ({children}) => {
    const [addingBook, setAddingBook] = useState(false);
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
                bookInfo,
                updateBookInfo,
                addingBook,
            }}
        >
            {children}
        </BookContext.Provider>
    );
};
