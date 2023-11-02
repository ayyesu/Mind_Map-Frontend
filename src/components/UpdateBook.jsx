import React, { useContext, useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { BookContext } from "../context/BookContext";

const UpdateBook = ({ bookId }) => {
  const { updateBookInfo, bookInfo, handleUpdateBook, fetchSingleBook } =
    useContext(BookContext);

  console.log("Book Info", bookInfo);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchDetails = async () => {
      await fetchSingleBook(bookId);
      if (isMounted) {
        setLoaded(true);
      }
    };

    fetchDetails();

    return () => {
      isMounted = false;
    };
  }, [bookId]);

  const updateBook = async (bookId, bookInfo) => {
    await handleUpdateBook(bookId, bookInfo);
  };

  if (!loaded) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <Container className="admin-container">
        <div className="admin-logo ">
          <img src="/img/logo.png" alt="logo" width="150px" />
        </div>
        <div className="admin-div">
          <div>
            <h1 className="admin-header">Update Ebook Details</h1>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateBook(bookId, bookInfo);
          }}
          className="admin-form"
        >
          <TextField
            label="Title"
            name="title"
            value={bookInfo.title}
            className="form-field"
            onChange={(e) => {
              updateBookInfo({
                ...bookInfo,
                title: e.target.value,
              });
            }}
          />
          <TextField
            label="Author"
            name="author"
            value={bookInfo.author}
            className="form-field"
            onChange={(e) => {
              updateBookInfo({
                ...bookInfo,
                author: e.target.value,
              });
            }}
          />
          <TextField
            label="Description"
            name="description"
            value={bookInfo.description}
            className="form-field"
            multiline
            rows={12}
            onChange={(e) => {
              updateBookInfo({
                ...bookInfo,
                description: e.target.value,
              });
            }}
          />

          <FormControl>
            <InputLabel>Category</InputLabel>
            <Select
              label="Category"
              name="category"
              className="form-field"
              value={bookInfo.category || ""}
              onChange={(e) => {
                updateBookInfo({
                  ...bookInfo,
                  category: e.target.value,
                });
              }}
            >
              {[
                "Personal Growth",
                "Business",
                "Technology",
                "Art",
                "Biology",
                "Science & Research",
                "Politics & History",
              ].map((selectedCategory) => (
                <MenuItem key={selectedCategory} value={selectedCategory}>
                  {selectedCategory}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button type="submit" variant="contained" color="primary">
            Update Book
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default UpdateBook;
