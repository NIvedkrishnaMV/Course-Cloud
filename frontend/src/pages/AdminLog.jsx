import React, { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  TextField,
  Typography,
  Modal,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdminLog = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {

    if (!email || !password) {
      alert("Enter email and password")
    }
    else if(email==="admin123@gmail.com" && password === "admin123"){
      alert("Welcome Admin");
      navigate('/admin');
    }
    else{
      alert("Wrong email or password")
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
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
            onClick={handleSubmit}
          >
            Log In
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AdminLog;