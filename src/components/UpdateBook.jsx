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
// import { Link as RouterLink, useParams } from "react-router-dom";
// import { Link } from "@mui/material";
// import PdfUploader from "../components/PdfUploader";
// import ImageUploader from "../components/ImageUploader";
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
          {/* <div className="pad-loading">
            <ImageUploader onImageSelect={handleImageUpload} />
          </div>
          <hr />
          <div className="pad-loading">
            <PdfUploader onFileSelect={handleFileUpload} />
          </div> */}
          {/* <TextField
            label="Image Url"
            name="imageUrl"
            className="form-field"
            value={bookInfo.imageUrl}
            onChange={(e) => {
              updateBookInfo({
                ...bookInfo,
                imageUrl: e.target.value,
              });
            }}
          /> */}
          {/* <TextField
            label="File Url"
            name="fileUrl"
            className="form-field"
            value={bookInfo.fileUrl}
            onChange={(e) => {
              updateBookInfo({
                ...bookInfo,
                fileUrl: e.target.value,
              });
            }}
          /> */}
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
          {/* <TextField
            label="Price (GH₵)"
            name="price"
            className="form-field"
            value={bookInfo.price}
            onChange={(e) => {
              updateBookInfo({
                ...bookInfo,
                price: e.target.value,
              });
            }}
          /> */}
          <Button type="submit" variant="contained" color="primary">
            Update Book
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default UpdateBook;
