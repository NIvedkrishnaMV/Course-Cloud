import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Modal,
} from "@mui/material";

const AdminLog = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleClose = () => {
    console.log("Modal Closed");
    // Add logic for closing the modal
  };

  const handleValidation = () => {
    // Simple email validation logic
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
    } else {
      setError("");
    }
  };

  const handlePassValidation = () => {
    // Add custom password validation logic here if needed
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
    } else {
      setError("");
    }
  };

  const handleULSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    console.log("Form Submitted with Email:", email, "Password:", password);
  };

  return (
    <Modal open={true} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Button
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            color: "gray",
          }}
          onClick={handleClose}
        >
          X
        </Button>
        <Typography variant="h4" component="h1" textAlign="center" gutterBottom>
          Admin Login
        </Typography>
        <form>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={handleValidation}
            error={Boolean(error)}
            helperText={error && error}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={handlePassValidation}
            error={Boolean(error)}
            helperText={error && error}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
            disabled={Boolean(error)}
            onClick={handleULSubmit}
          >
            Log In
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AdminLog;