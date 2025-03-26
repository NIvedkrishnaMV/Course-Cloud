import React, { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Button,
  TextField,
  Typography,
  Modal,
  IconButton,
} from "@mui/material";

const UserLog = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [errors, setErrors] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleValidation = () => {
    const newErrors = {};
    // Email validation
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format.";
    }
    // Password validation
    if (!password.trim()) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleValidation();

    if (!errors.email && !errors.password) {
      try {
        const response =await axios.post('http://localhost:3001/apiu/log',{email,password});
        localStorage.setItem('token',response.data.token);
        if (response.data.status === 'success'){
          alert(response.data.message);
          navigate('/ulanding', { replace: true })
        }
        if(response.data.status==='error'){
          alert(response.data.message);
        }
      } catch (error) {
        alert("Something went wrong");
      }
    }
  };

  return (
    <Modal open={true}>
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
        <IconButton
          sx={{ position: "absolute", top: 10, right: 10 }}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h4" component="h1" textAlign="center" gutterBottom>
          User Login
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
            error={Boolean(errors.email)}
            helperText={errors.email}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={handleValidation}
            error={Boolean(errors.password)}
            helperText={errors.password}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
            onClick={handleSubmit}
            disabled={Boolean(errors.email || errors.password)}
          >
            Log In
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default UserLog;