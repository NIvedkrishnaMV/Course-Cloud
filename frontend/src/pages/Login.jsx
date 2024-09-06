// import { AppBar, Box, Button, TextField, Typography } from "@mui/material";
import { Navigate, useNavigate } from 'react-router-dom';
import './style.css';
import React, { useState } from 'react';
import axios from 'axios'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate =useNavigate()
  
  const handleSubmit =async(event)=>{
    try {
      if (email === '' || password === '') {
        alert("You missed a value");
      } else {
        const response = await axios.post('http://localhost:3001/apiu/log', {email,password});
        if (response.status === 200) {
          alert("Successfully logged in");
          navigate('/landing');
        } else if (response.status === 404) {
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
  

  return (
    <div>
<div className='logdiv'>
  <h3 className='logh3'>Login</h3>
  <br /><br />
  <input type="text" onChange={(e) => setEmail(e.target.value)} placeholder="Email" className='loguser' />
  <br /><br />
  <input type="password" onChange={(e) => setPassword(e.target.value)} className='logpass' placeholder="Password" />
  <br /><br />
  <button type="submit" onClick={handleSubmit}  className='logbut'>Log In</button>
</div>
    </div>
  )
}

export default Login
