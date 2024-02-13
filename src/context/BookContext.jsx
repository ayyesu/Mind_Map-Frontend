import {createContext, useState, useCallback, useEffect} from 'react';
import {
    baseUrl,
    postRequest,
    getRequest,
    filePostRequest,
    deleteRequest,
    updateRequest,
} from '../utils/Service';
import {toast} from 'react-toastify';
import delay from 'delay';

export const BookContext = createContext();

export const BookContextProvider = ({children}) => {
    const [addingBook, setAddingBook] = useState(false);
    const [updatingBook, setUpdatingBook] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [imageLinkLoading, setImageLinkLoading] = useState(false);
    const [fileLinkLoading, setFileLinkLoading] = useState(false);
    const [fileUrl, setFileUrl] = useState('');
    const [books, setBooks] = useState([]);
    const [fetchingBook, setFetchingBook] = useState(false);
    const [loading, setLoading] = useState(true);
    const [bookDetails, setBookDetails] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [imageName, setImageName] = useState('');
    const [fileName, setFileName] = useState('');
    const [userBooks, setUserBooks] = useState([]);
    const [randomisedBookDetails, setRandomisedBookDetails] = useState([]);
    const [bookInfo, setBookInfo] = useState({
        title: '',
        author: '',
        description: '',
        category: '',
        price: '',
    });
    console.log('File Name', fileName);
    console.log('Book Info', bookInfo);

    const updateBookInfo = useCallback(
        (info) => {
            setBookInfo(info);
        },
        [bookInfo],
    );

    // Fetching a single book
    const fetchSingleBook = useCallback(async (bookId) => {
        try {
            setFetchingBook(true);
            await delay(2000);
            const response = await getRequest(`${baseUrl}/api/books/${bookId}`);
            if (response?.error) {
                toast.error(response?.message);
            } else {
                setFetchingBook(false);
                setBookDetails(response);
                setBookInfo(response);
            }
        } catch (error) {
            setFetchingBook(false);
            console.error('An error occurred fetching the book:', error);
        }
    }, []);

    // Fetching search results
    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const response = await fetch(
                    `/api/books/search?q=${searchQuery}`,
                );
                const data = await response.json();
                setSearchResults(data);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };

        if (searchQuery !== '') {
            fetchSearchResults();
        }
    }, [searchQuery]);

    // Fetching all books
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

    // Fetch books posted by a particular user
    const fetchUserBooks = async (userId) => {
        try {
            const response = await getRequest(
                `${baseUrl}/api/books/user/${userId}`,
            );
            if (response?.error) {
                toast.error(response?.message);
            } else {
                setUserBooks(response);
            }
        } catch (error) {
            console.error('An error occurred fetching the book:', error);
        }
    };

    // Get randomised books based on book with the same category from backend
    const fetchRandomBookWithSameCategory = async (category) => {
        try {
            const response = await getRequest(
                `${baseUrl}/api/books/${category}`,
            );

            if (response?.error) {
                toast.error(response?.error);
            } else {
                setRandomisedBookDetails(response);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    const handleImageUpload = async (file) => {
        if (file == null) return;
        const formData = new FormData();
        formData.append('file', file);
        setImageLinkLoading(true);

        const response = await filePostRequest(
            `${baseUrl}/api/image/upload`,
            formData,
        );
        if (response?.error) {
            toast.error(response?.message);
            setImageLinkLoading(false);
        } else {
            setImageName(response.name);
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
            setFileName(response.name);
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
                const localStorageuserId = localStorage.getItem('User');
                const userId = JSON.parse(localStorageuserId)?.user._id;

                if (!userId) {
                    throw new Error('User ID not found in local storage');
                }

                const response = await postRequest(
                    `${baseUrl}/api/books/${userId}/add-book`,
                    JSON.stringify({
                        ...bookInfo,
                        imageUrl,
                        fileUrl,
                        imageName,
                        fileName,
                    }),
                );

                setAddingBook(false);

                if (response.error) {
                    toast.error(response.message);
                } else {
                    toast.success('Book Added Successfully');
                    setImageName('');
                    setFileName('');
                    setImageUrl('');
                    setFileUrl('');
                    window.location.href = `/user/posts/${userId}`;
                }
            } catch (error) {
                console.error('An error occurred adding book:', error);
                setAddingBook(false);
            }
        },
        [bookInfo],
    );

    // Deleting a book
    const handleDeleteBook = useCallback(async (bookId) => {
        try {
            const response = await deleteRequest(
                `${baseUrl}/api/books/${bookId}/delete`,
            );

            if (response.error) {
                toast.error(response.message);
            } else {
                toast.success('Book Deleted Successfully');
                window.location.reload();
            }
        } catch (error) {
            console.error('An error occurred deleting book:', error);
        }
    }, []);

    const handleUpdateBook = useCallback(async (bookId, bookInfo) => {
        setUpdatingBook(true);
        try {
            const response = await updateRequest(
                `${baseUrl}/api/books/${bookId}/update-book`,
                JSON.stringify(bookInfo),
            );

            setUpdatingBook(false);

            if (response.error) {
                toast.error(response.message);
            } else {
                toast.success('Book Updated Successfully');
                // window.location.href = `/book/${bookId}`;
            }
        } catch (error) {
            console.error('An error occurred adding book:', error);
            setUpdatingBook(false);
        }
    }, []);

    return (
        <BookContext.Provider
            value={{
                handleAddingBook,
                handleImageUpload,
                handleFileUpload,
                setImageUrl,
                bookDetails,
                books,
                loading,
                bookInfo,
                updateBookInfo,
                imageLinkLoading,
                fileLinkLoading,
                addingBook,
                fetchSingleBook,
                searchQuery,
                setSearchQuery,
                randomisedBookDetails,
                fetchRandomBookWithSameCategory,
                fetchUserBooks,
                fetchingBook,
                userBooks,
                handleDeleteBook,
                handleUpdateBook,
                updatingBook,
            }}
        >
            {children}
        </BookContext.Provider>
    );
};
