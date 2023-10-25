import React, { useContext, useEffect } from "react";
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

const UserBooks = () => {
  const { userBooks, fetchUserBooks } = useContext(BookContext);
  const { userId } = useParams();

  useEffect(() => {
    fetchUserBooks(userId);
  }, [userId]);

  return (
    <div>
      <NavBar />
      <div>
        {userBooks == [] ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h4">No Books Uploaded</Typography>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              marginTop: "50px",
              flexWrap: "wrap",
              justifyContent: "flex-start",
            }}
          >
            {userBooks.map((book) => (
              <Card key={book._id} style={{ maxWidth: 345, margin: "10px" }}>
                <CardMedia
                  component="img"
                  alt={book.title}
                  height="140"
                  image={book.imageUrl}
                />
                <CardContent>
                  <Typography variant="h6">{book.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Author: {book.author}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Date Added: {new Date(book.createdAt).toLocaleDateString()}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button variant="outlined" color="primary">
                    Update
                  </Button>
                  <Button variant="outlined" color="error">
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
