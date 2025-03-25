import React, { useState } from 'react';
import { Box, Typography, TextField, Button, IconButton, RadioGroup, FormControlLabel, Radio, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserSign = ({ handleClose }) => {
  const [uname, setUname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle form submission
  const handleUSSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Reset any existing error

    // Basic validation for empty fields
    if (!uname || !email || !password || !age || !gender || !phone) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:3001/apiu/reg', {
        uname,
        email,
        password,
        age,
        gender,
        phone,
      });

      if (res.status === 200) {
        alert('Registered successfully!');
        navigate('/', { replace: true });
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
        User Signup
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
      <form onSubmit={handleUSSubmit}>
        <Stack spacing={2}>
          {/* Name Input */}
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            value={uname}
            onChange={(e) => setUname(e.target.value)}
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

          {/* Gender Selection */}
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Gender:
            </Typography>
            <RadioGroup
              row
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <FormControlLabel
                value="male"
                control={<Radio />}
                label="Male"
              />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
            </RadioGroup>
          </Box>

          {/* Phone Input */}
          <TextField
            fullWidth
            label="Phone"
            type="tel"
            variant="outlined"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            inputProps={{
              pattern: '[0-9]{10}',
              title: 'Phone number should contain 10 digits (e.g., 9876543210)',
            }}
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

export default UserSign;