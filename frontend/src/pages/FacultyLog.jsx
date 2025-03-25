import React, { useState } from 'react';
import { Box, Typography, TextField, Button, IconButton, Stack, Link } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FacultyLog = ({ handleClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle form submission
  const handleFLSubmit = async (event) => {
    event.preventDefault();
    setError(""); // Reset error message

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/apit/log', { email, password });
      if (response.status === 200) {
        alert("Welcome Faculty");
        navigate('/landing', { replace: true });
      } else if (response.status === 404) {
        const errorMessage = response.data;
        if (errorMessage === 'Email not registered') {
          setError('Email not registered.');
        } else if (errorMessage === 'Incorrect password') {
          setError('Incorrect password.');
        } else {
          setError('An error occurred during login.');
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setError(`Login error: ${error.response.data}`);
        } else {
          setError("Login request failed.");
        }
      } else {
        console.error(error);
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: { xs: "90%", sm: "400px" },
        bgcolor: "background.paper",
        boxShadow: 24,
        borderRadius: 2,
        p: 4,
        zIndex: 1300,
      }}
    >
      {/* Close Button */}
      <IconButton
        sx={{ position: "absolute", top: 10, right: 10 }}
        onClick={handleClose}
      >
        <CloseIcon />
      </IconButton>

      {/* Header */}
      <Typography variant="h4" sx={{ mb: 2, textAlign: "center", fontWeight: "bold" }}>
        Faculty Login
      </Typography>

      {/* Error Message */}
      {error && (
        <Typography
          variant="body2"
          color="error"
          sx={{ mb: 2, textAlign: "center" }}
        >
          {error}
        </Typography>
      )}

      {/* Login Form */}
      <form onSubmit={handleFLSubmit}>
        <Stack spacing={2}>
          {/* Email Input */}
          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password Input */}
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Submit Button */}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
          >
            Log In
          </Button>
        </Stack>
      </form>

      {/* Signup Redirect */}
      <Typography
        variant="body2"
        sx={{ mt: 2, textAlign: "center" }}
      >
        New User?{" "}
        <Link
          component="button"
          onClick={() => {
            handleClose();
            navigate('/signup');
          }}
          underline="hover"
          sx={{ cursor: "pointer", color: "primary.main" }}
        >
          Signup
        </Link>
      </Typography>
    </Box>
  );
};

export default FacultyLog;