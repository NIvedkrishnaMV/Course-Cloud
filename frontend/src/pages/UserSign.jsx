import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stack,
  Modal
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const UserSign = ({ handleClose }) => {
  const [uname, setUname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({ uname:"", email: "", password: "", age:"" , phone:""  });

  const handleValidation2 =()=>{
    const newErrors = {};

    if (!uname.trim()) newErrors.uname = 'Name is required.';
    if (!email.trim()) {
      newErrors.email = 'Email is required.';
    } 
    if (!password.trim()) {
      newErrors.password = 'Password is required.';
    }
    if (!age) {
      newErrors.age = 'Age is required.';
    }
    if (!gender) newErrors.gender = 'Gender is required.';
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleValidation = () => {
    const newErrors = {};
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email format.';
    }
    if (password && password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }
    if (age && age <= 0) {
      newErrors.age = 'Age must be a positive number.';
    }
    if (phone && !/^[0-9]{10}$/.test(phone)) {
      newErrors.phone = 'Phone number must be 10 digits.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleValidation();
    handleValidation2();

    if (!errors.email && !errors.password && !errors.age && !errors.uname && !errors.phone) { 
      try {
        const response = await axios.post('http://localhost:3001/apiu/reg', {
          uname,
          email,
          password,
          age,
          gender,
          phone,
        });
        if (response.data.status === 'success') {
          alert(response.data.message);
          handleClose(); 
        }
        if (response.data.status === 'error') {
          alert(response.data.message);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong. Please try again later.');
      }
  
    }
  };

  return (
    <Modal open={true}>
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
          zIndex: 1300
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

        {/* Signup Form */}
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            {/* Name Input */}
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              value={uname}
              onBlur={handleValidation}
              onChange={(e) => setUname(e.target.value)}
              error={Boolean(errors.uname)}
              helperText={errors.uname}
              required
            />

            {/* Email Input */}
            <TextField
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
              value={email}
              onBlur={handleValidation}
              onChange={(e) => setEmail(e.target.value)}
              error={Boolean(errors.email)}
              helperText={errors.email}
              required
            />

            {/* Password Input */}
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onBlur={handleValidation}
              onChange={(e) => setPassword(e.target.value)}
              error={Boolean(errors.password)}
              helperText={errors.password}
              required
            />

            {/* Age Input */}
            <TextField
              fullWidth
              label="Age"
              type="number"
              variant="outlined"
              value={age}
              onBlur={handleValidation}
              onChange={(e) => setAge(e.target.value)}
              error={Boolean(errors.age)}
              helperText={errors.age}
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
              {errors.gender && (
                <Typography variant="body2" color="error">
                  {errors.gender}
                </Typography>
              )}
            </Box>

            {/* Phone Input */}
            <TextField
              fullWidth
              label="Phone"
              type="tel"
              variant="outlined"
              value={phone}
              onBlur={handleValidation}
              onChange={(e) => setPhone(e.target.value)}
              error={Boolean(errors.phone)}
              helperText={errors.phone}
              required
            />

            {/* Submit Button */}
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              onClick={handleValidation2}
              disabled={Boolean(errors.uname || errors.email || errors.age || errors.password|| errors.phone )}
            >
              Sign Up
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};

export default UserSign;