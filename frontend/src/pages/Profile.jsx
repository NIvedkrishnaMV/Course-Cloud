import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Box, Typography, AppBar, Toolbar, IconButton, Avatar } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LogoutIcon from '@mui/icons-material/Logout';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [name, setName] = useState('');

  const goHome = () => {
    setName('');
    navigate('/landing', { replace: true });
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No token found, please log in.');
        return;
      }
      try {
        const url = 'http://localhost:3001/apit/profile' ;
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
        setName( response.data.tname);
      } catch (error) {
        console.error(error.message);
        alert(error.response?.data?.message || 'Error fetching profile');
      }
    };
    fetchProfile();
  }, []);

  const handleEdit = (users) => {
      const user= users;
      navigate(`/tedit` ,{state :{user:user}});
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

  return (
    <Box
  sx={{
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    padding: 3,
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)', // Adding shadow
    borderRadius: 2, // Optional, for rounded edges
    elevation: 3, // Visual elevation effect
  }}
>
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

  <Box
    sx={{
      textAlign: 'center',
      width: 700,
      margin : 'auto' ,
      padding: 3,
      backgroundColor: 'white', // Adds a card-like effect
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Optional shadow for internal content
      borderRadius: 2,
    }}
  >
    <Avatar
      sx={{
        width: 120,
        height: 120,
        margin: '0 auto',
        backgroundColor: '#EADDFF',
        color: '#4F378A',
      }}
    >
      {name.charAt(0).toUpperCase()}
    </Avatar>
    <Typography
      variant="h3"
      sx={{
        marginTop: 3,
        fontWeight: 'bold',
        color: 'text.primary',
      }}
    >
      {name}
    </Typography>
    {user.age && (
      <Typography
        variant="h5"
        sx={{
          color: 'text.secondary',
          marginTop: 2,
          fontWeight: 500,
        }}
      >
        Age: {user.age}
      </Typography>
    )}
    <Typography
      variant="h6"
      sx={{
        color: 'text.secondary',
        marginTop: 1.5,
        fontWeight: 'bold',
      }}
    >
      Email: {user.email}
    </Typography>
    <Typography
      variant="h6"
      sx={{
        color: 'text.secondary',
        marginTop: 1.5,
        fontWeight: 'bold',
      }}
    >
      Gender: {user.gender}
    </Typography>
    <Typography
      variant="h6"
      sx={{
        color: 'text.secondary',
        marginTop: 1.5,
        fontWeight: 'bold',
      }}
    >
      Contact Info: {user.phone}
    </Typography>
  </Box>

  <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
    <Button
      variant="contained"
      size="large"
      onClick={()=>handleEdit(user)}
      sx={{
        textTransform: 'none',
        borderRadius: 3,
        paddingX: 5,
        fontWeight: 'bold',
        fontSize: '1.2rem', // Making the button text bigger
        boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.15)', // Enhanced shadow for the button
      }}
    >
      Edit Profile
    </Button>
  </Box>
</Box>

  );
};

export default Profile;
