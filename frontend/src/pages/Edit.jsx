import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LogoutIcon from '@mui/icons-material/Logout';

const Edit = () => {
  const location = useLocation();
  const { user } = location.state || {};
  const navigate =useNavigate();
   

  const [formData, setFormData] = useState({
    tname: user?.tname || '',
    email: user?.email || '',
    password: user?.password || '',
    age: user?.age || '',
    gender: user?.gender || '',
    phone: user?.phone || '',
  });
  const goHome=()=>{  
    navigate('/profile')
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); // Update form data dynamically
  };
  const handleLogOut = async () => {
    try {
      const userConfirmed = window.confirm("Do you want to proceed?");
    
      if (userConfirmed) {
        sessionStorage.clear();
        alert("Logged Out");
        navigate('/', { replace: true });
      } 
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Failed to log out. Please try again.");
    }
  };
 

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3001/apit/edit/${user._id}`, formData) // Send updated data
      .then((response) => {
        alert('Profile updated successfully!');
        navigate('/profile' ,{ replace: true })
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
        alert('Failed to update profile.');
      });
  };

  return (
    <>
    <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={goHome}>
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                Profile
              </Typography>
              <IconButton color="inherit" onClick={handleLogOut}>
                <LogoutIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
        
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Username:</label>
          <input
            type="text"
            name="tname"
            value={formData.tname}
            onChange={handleChange}
            required
            style={{ display: 'block', width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ display: 'block', width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ display: 'block', width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            style={{ display: 'block', width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            style={{ display: 'block', width: '100%', padding: '8px' }}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Phone:</label>
          <input
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            style={{ display: 'block', width: '100%', padding: '8px' }}
          />
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            padding: '10px 15px',
            cursor: 'pointer',
            borderRadius: '5px',
          }}
        >
          Update Profile
        </button>
      </form>
    </div></>
  );
};

export default Edit;