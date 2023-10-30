import React, { useContext } from "react";
import {
  Container,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";
import PdfUploader from "../components/PdfUploader";
import ImageUploader from "../components/ImageUploader";
import { BookContext } from "../context/BookContext";

const Admin = () => {
  const {
    updateBookInfo,
    bookInfo,
    handleAddingBook,
    imageUrl,
    fileUrl,
    handleImageUpload,
    handleFileUpload,
  } = useContext(BookContext);

  return (
    <div>
      <Container className="admin-container">
        <div className="admin-div">
          <div>
            <h1 className="admin-header">Admin Console</h1>
          </div>
          <div className="admin-homelogo">
            <Link component={RouterLink} to="/">
              <p className="link">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="#2196f32e"
                  className="bi bi-house"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z" />
                </svg>
              </p>
            </Link>
          </div>
        </div>

        <form onSubmit={handleAddingBook} className="admin-form">
          <TextField
            label="Title"
            name="title"
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
          <div className="pad-loading">
            <ImageUploader onImageSelect={handleImageUpload} />
          </div>
          <hr />
          <div className="pad-loading">
            <PdfUploader onFileSelect={handleFileUpload} />
          </div>
          <TextField
            label="Image Url"
            name="imageUrl"
            className="form-field"
            value={imageUrl || ""}
            onChange={(e) => {
              updateBookInfo({
                ...bookInfo,
                imageUrl: e.target.value,
              });
            }}
          />
          <TextField
            label="File Url"
            name="fileUrl"
            className="form-field"
            value={fileUrl || ""}
            onChange={(e) => {
              updateBookInfo({
                ...bookInfo,
                fileUrl: e.target.value,
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
          <TextField
            label="Price (GH₵)"
            name="price"
            className="form-field"
            onChange={(e) => {
              updateBookInfo({
                ...bookInfo,
                price: e.target.value,
              });
            }}
          />
          <Button type="submit" variant="contained" color="primary">
            Add Book
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default Admin;
