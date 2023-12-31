import React, { useContext, useEffect, useState } from "react";
import { BookContext } from "../context/BookContext";
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  CardMedia,
} from "@mui/material";
import NavBar from "../components/NavBar";
import { useParams } from "react-router-dom";
import Modal from "react-modal";
import UpdateBook from "../components/UpdateBook";

const UserBooks = () => {
  const { userBooks, fetchUserBooks, handleDeleteBook, handleUpdateBook } =
    useContext(BookContext);
  const [modalIsOpen, setModalIsOpen] = useState(false); // State for modal

  const { userId } = useParams();

  useEffect(() => {
    fetchUserBooks(userId);
  }, [userId]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <NavBar />
      <div>
        <h2
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          Manage Posts
        </h2>
        {userBooks.length == 0 ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
            }}
          >
            <Typography variant="h6">No Books Uploaded</Typography>
          </div>
        ) : (
          <div className="userBook-area">
            {userBooks.map((book) => (
              <Card
                key={book._id}
                style={{
                  maxWidth: 245,
                  margin: "10px",
                  cursor: "pointer",
                  transition: "transform 0.3s ease-in-out", 
                }}
                className="card-hover"
              >
                <CardMedia
                  component="img"
                  alt={book.title}
                  title={book.title}
                  height="140"
                  image={book.imageUrl}
                />
                <CardContent>
                  <Typography variant="h6">
                    {book.title.slice(0, 20) + "..."}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Author: {book.author}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Date Added: {new Date(book.createdAt).toLocaleDateString()}
                  </Typography>
                </CardContent>
                <Modal
                  isOpen={modalIsOpen}
                  onRequestClose={closeModal}
                  contentLabel={book.title}
                >
                  <button
                    title="Close"
                    className="delete-icon"
                    onClick={closeModal}
                  >
                    x
                  </button>
                  <UpdateBook bookId={book._id} />
                </Modal>
                <CardActions>
                  <Button
                    onClick={() => openModal()}
                    variant="outlined"
                    color="primary"
                  >
                    Update
                  </Button>
                  <Button
                    onClick={() => handleDeleteBook(book._id)}
                    variant="outlined"
                    color="error"
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserBooks;
