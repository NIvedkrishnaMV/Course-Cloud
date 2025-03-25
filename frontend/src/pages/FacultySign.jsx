import React, { useState } from 'react';
import { Box, Typography, TextField, Button, IconButton, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const FacultySign = ({ handleClose }) => {
  const [tname, setTname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [error, setError] = useState('');

  // Handle form submission
  const handleFSSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Reset any existing error

    // Basic validation for empty fields
    if (!tname || !email || !password || !age) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:3001/apit/reg', {
        tname,
        email,
        password,
        age,
      });

      if (res.status === 200) {
        alert('Registered successfully!');
        window.location.reload();
      } else {
        setError('Registration failed.');
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred during registration.');
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: '90%', sm: '400px' },
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: 2,
        p: 4,
        zIndex: 1300,
      }}
    >
      {/* Close Button */}
      <IconButton
        sx={{ position: 'absolute', top: 10, right: 10 }}
        onClick={handleClose}
      >
        <CloseIcon />
      </IconButton>

      {/* Header */}
      <Typography variant="h4" sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold' }}>
        Teacher Signup
      </Typography>

      {/* Error Message */}
      {error && (
        <Typography
          variant="body2"
          color="error"
          sx={{ mb: 2, textAlign: 'center' }}
        >
          {error}
        </Typography>
      )}

      {/* Signup Form */}
      <form onSubmit={handleFSSubmit}>
        <Stack spacing={2}>
          {/* Name Input */}
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            value={tname}
            onChange={(e) => setTname(e.target.value)}
            required
          />

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

          {/* Age Input */}
          <TextField
            fullWidth
            label="Age"
            type="number"
            variant="outlined"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />

          {/* Submit Button */}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
          >
            Sign Up
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default FacultySign;