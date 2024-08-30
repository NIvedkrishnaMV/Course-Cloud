// import { AppBar, Box, Button, TextField, Typography } from "@mui/material";
import './style.css';
import React from 'react';
const Login = () => {
  return (
    <div>
<div className='logdiv'>
  <h3 className='logh3'>Login</h3>
  <br /><br />
  <input type="text" placeholder="Username" className='loguser' />
  <br /><br />
  <input type="password" className='logpass' placeholder="Password" />
  <br /><br />
  <button type="submit" className='logbut'>Log In</button>
</div>
    </div>
  )
}

export default Login
