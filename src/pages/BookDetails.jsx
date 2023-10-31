// Import necessary modules
import React, { useContext, useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import NavBar from "../components/NavBar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { BookContext } from "../context/BookContext";
import moment from "moment";
import Modal from "react-modal";
import PDFViewer from "../components/PDFViewer"; // Create a new component for PDF Viewer

export default function BookDetailsPage() {
  const { bookDetails, fetchSingleBook } = useContext(BookContext);
  const { bookId } = useParams();
  const abortController = new AbortController();
  useEffect(() => {
    // Fetch a specific book when the component mounts
    fetchSingleBook(bookId);

    return () => {
      abortController.abort();
    };
  }, [bookId]);

  const onDownloadbtnClick = () => {
    window.open(bookDetails.fileUrl, "_blank");
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

  return (
    <div>
      <CssBaseline />
      <NavBar />
      <div className="book-detail-body">
        {/* Hero unit */}
        <Box
          style={{ backgroundColor: "#2196f32e" }}
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container
            className="book-detail"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "2rem",
            }}
          >
            <div className="book-img" style={{ marginRight: "2rem" }}>
              <img
                src={bookDetails.imageUrl}
                alt="Book Cover"
                className="book-cover"
              />
            </div>
            <div className="side-detail">
              <p
                className="title"
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  marginBottom: "0.5rem",
                }}
              >
                {bookDetails.title}
              </p>
              <pre
                className="author"
                style={{
                  fontSize: "1rem",
                  marginBottom: "0.5rem",
                }}
              >
                By {bookDetails.author}
              </pre>
              <pre>
                Last Updated:{" "}
                <span>{moment(bookDetails.createdAt).calendar()}</span>
              </pre>
              {showFullDescription ? (
                <pre className="description">
                  {bookDetails.description} <br />
                  <span className="show-more" onClick={toggleDescription}>
                    Show Less
                  </span>
                </pre>
              ) : (
                <pre className="description">
                  {bookDetails.description?.slice(0, 100)}...
                  <span className="show-more" onClick={toggleDescription}>
                    Show More
                  </span>
                </pre>
              )}
              <p
                className="price"
                style={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  marginBottom: "0.5rem",
                }}
              >
                {bookDetails.price}
              </p>
              <p
                className="category"
                style={{
                  fontSize: "1rem",
                  marginBottom: "0.5rem",
                }}
              >
                {bookDetails.category}
              </p>
              <div className="book-detail-btn">
                <div>
                  <button className="download-btn" onClick={() => openModal()}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-box-arrow-down"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.5 10a.5.5 0 0 1-.5-.5v-8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 0 0 1h2A1.5 1.5 0 0 0 14 9.5v-8A1.5 1.5 0 0 0 12.5 0h-9A1.5 1.5 0 0 0 2 1.5v8A1.5 1.5 0 0 0 3.5 11h2a.5.5 0 0 0 0-1h-2z"
                      />
                      <path
                        fillRule="evenodd"
                        d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708l3 3z"
                      />
                    </svg>{" "}
                    Preview
                  </button>
                </div>
                <div>
                  <button className="download-btn" onClick={onDownloadbtnClick}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-cloud-download"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z" />
                      <path d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708l3 3z" />
                    </svg>{" "}
                    Download
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
                  title="Close"
                  className="delete-icon"
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
