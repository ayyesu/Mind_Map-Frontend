import { createContext, useState, useCallback, useEffect } from "react";
import {
  baseUrl,
  postRequest,
  getRequest,
  filePostRequest,
} from "../utils/Service";
import { toast } from "react-toastify";

export const BookContext = createContext();

export const BookContextProvider = ({ children }) => {
  const [addingBook, setAddingBook] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageLinkLoading, setImageLinkLoading] = useState(false);
  const [fileLinkLoading, setFileLinkLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookDetails, setBookDetails] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [userBooks, setUserBooks] = useState([]);
  console.log("userBooks", userBooks);
  const [randomisedBookDetails, setRandomisedBookDetails] = useState([]);
  const [bookInfo, setBookInfo] = useState({
    title: "",
    author: "",
    description: "",
    category: "",
    price: "",
    imageUrl,
    fileUrl,
  });

  const updateBookInfo = useCallback((info) => {
    setBookInfo(info);
  }, []);

  // Fetching a single book
  const fetchSingleBook = useCallback(async (bookId) => {
    try {
      const response = await getRequest(`${baseUrl}/api/books/${bookId}`);
      if (response?.error) {
        toast.error(response?.message);
      } else {
        setBookDetails(response);
      }
    } catch (error) {
      console.error("An error occurred fetching the book:", error);
    }
  }, []);

  // Fetching search results
  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(`/api/books/search?q=${searchQuery}`);
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    if (searchQuery !== "") {
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
      const response = await getRequest(`${baseUrl}/api/books/user/${userId}`);
      if (response?.error) {
        toast.error(response?.message);
      } else {
        setUserBooks(response);
      }
    } catch (error) {
      console.error("An error occurred fetching the book:", error);
    }
  };

  // Get randomised books based on book with the same category from backend
  const fetchRandomBookWithSameCategory = async (category) => {
    try {
      const response = await getRequest(`${baseUrl}/api/books/${category}`);

      if (response?.error) {
        toast.error(response?.error);
      } else {
        setRandomisedBookDetails(response);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleImageUpload = async (file) => {
    if (file == null) return;
    const formData = new FormData();
    formData.append("file", file);
    setImageLinkLoading(true);

    const response = await filePostRequest(
      `${baseUrl}/api/image/upload`,
      formData
    );
    if (response?.error) {
      toast.error(response?.message);
      setImageLinkLoading(false);
    } else {
      setImageUrl(response.downloadURL);
      setImageLinkLoading(false);
      toast.success("Image Uploaded Successfully");
    }
  };

  const handleFileUpload = async (file) => {
    if (file == null) return;
    const formData = new FormData();
    formData.append("file", file);
    setFileLinkLoading(true);

    const response = await filePostRequest(
      `${baseUrl}/api/file/upload`,
      formData
    );
    console.log("response", response);
    if (response?.error) {
      toast.error(response?.message);
      setFileLinkLoading(false);
    } else {
      setFileUrl(response.downloadURL);
      setFileLinkLoading(false);
      toast.success("Image Uploaded Successfully");
    }
  };

  const handleAddingBook = useCallback(
    async (e) => {
      e.preventDefault();
      setAddingBook(true);

      try {
        const localStorageuserId = localStorage.getItem("User");
        const userId = JSON.parse(localStorageuserId)?.user._id;

        if (!userId) {
          throw new Error("User ID not found in local storage");
        }

        const response = await postRequest(
          `${baseUrl}/api/books/${userId}/add-book`,
          JSON.stringify({ ...bookInfo, imageUrl, fileUrl })
        );

        setAddingBook(false);

        if (response.error) {
          toast.error(response.message);
        } else {
          toast.success("Book Added Successfully");
          window.location.href = `/user/posts/${userId}`;
        }
      } catch (error) {
        console.error("An error occurred adding book:", error);
        setAddingBook(false);
      }
    },
    [bookInfo]
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
        userBooks,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};
