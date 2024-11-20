// import { AppBar, Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import './style.css';
import React, { useState } from 'react';
import axios from 'axios'
import './modal.css';

const Login = ({isOpen, onClose}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate =useNavigate();
  
  const handleSubmit =async(event)=>{
    event.preventDefault();
    try {
      if (email === '' || password === '') {
        alert("You missed a value");
      } else {
        const response = await axios.post('http://localhost:3001/apiu/log', {email,password});
        if (response.status === 200) {
          if(response.data.isAdmin){
            alert("Welcome Admin");
            navigate('/admin');
          }
          else{
            alert("Welcome User");
            navigate('/landing');
          }
        }
        else if (response.status === 404) {
          const errorMessage = response.data;
          if (errorMessage === 'Email not registered') {
            alert('Email not registered');
          }
          else if(errorMessage === 'Incorrect password'){
            alert('Incorrect password');
          } else {
            alert("Error logging in");
          }
        } else {
          alert("Error logging in");
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          alert("Error logging in: " + error.response.data);
        } else {
          alert("Couldn't log in");
        }
      } else {
        console.error(error);
        alert("An unexpected error occurred");
      }
    }    
  }
  
  if(!isOpen) return null;
  

  return (
<div className="modal-overlay">
<div className="modal-content">
    <button className="close-button" onClick={onClose}>X</button>
    <h1>Login</h1>
    <form>
        <input
            className='email-input'
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
        /><br /><br />
        <input
            className='password-input'
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
        /><br />
          <br />
        <button className="login-btn" onClick={handleSubmit} type="submit">Log In</button><br />
        <div className="newuser"><h4>New User?<a href="/">Signup</a></h4></div>
    </form>
</div>
</div>
  )
}

export default Login
