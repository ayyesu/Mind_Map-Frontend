import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Box, Container, Typography } from "@mui/material";
import { baseUrl } from "../utils/Service";
import { toast } from "react-toastify";

const AdminRequestForm = () => {
  const [username, setUserName] = useState("");
  const [isMessageSending, setIsMessageSending] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [messageError, setMessageError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsMessageSending(true);
    try {
      const response = await axios.post(`${baseUrl}/send-request`, {
        username,
        email,
        message,
      });
      if (response.error) {
        setMessageError(true);
        setIsMessageSending(false);
        // setResponseErrorMessage(response);
        toast.error(response);
      }
      console.log(response);
      setStatus(response.data);
      setIsMessageSending(false);
      toast.success(response.data.message);
      // Make fields empty
      setUserName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setMessageError(true);
      setIsMessageSending(false);
      console.log("Error", err.message);
      toast.error("An error occurred while submitting the form.");
    }
  };

  return (
    <div className="admin-request" style={{ marginTop: 0 }}>
      <Container maxWidth="sm">
        <Box mt={5}>
          <Typography variant="h4" align="center" gutterBottom>
            Publisher Right Request Form
          </Typography>
          <Typography variant="body1" align="center" gutterBottom>
            We're thrilled to hear that you're interested in contributing to our
            community by publishing books! To get started, we kindly ask you to
            fill out the Admin Request Form linked below. This form will help us
            understand your interest and qualifications better. Once we receive
            your request, our team will review it promptly. If everything
            aligns, we'll be more than happy to grant you the necessary rights
            to publish books on our platform.
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              variant="outlined"
              label="Username"
              name="username"
              onChange={(e) => setUserName(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              type="email"
              required
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Message"
              name="message"
              onChange={(e) => setMessage(e.target.value)}
              margin="normal"
              multiline
              rows={4}
              required
            />
            <Button variant="contained" color="primary" type="submit" fullWidth>
              {isMessageSending ? "Submitting Request..." : "Submit Request"}
            </Button>
          </form>
        </Box>
      </Container>
    </div>
  );
};

export default AdminRequestForm;
