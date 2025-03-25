import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem,
  InputBase,
  Paper,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import UserLog from "./UserLog";
import FacultyLog from "./FacultyLog";
import AdminLog from "./AdminLog";
import UserSign from "./UserSign";
import FacultySign from "./FacultySign";
import CloseIcon from "@mui/icons-material/Close";

const Home = () => {
  const [loginMenuAnchor, setLoginMenuAnchor] = useState(null);
  const [signupMenuAnchor, setSignupMenuAnchor] = useState(null);
  const [login, setLogin] = useState("");
  const [searchText, setSearchText] = useState("");

  // Login Menu Functions
  const handleLoginMenuOpen = (event) => {
    setLoginMenuAnchor(event.currentTarget);
  };

  const handleLoginMenuClose = () => {
    setLoginMenuAnchor(null);
  };

  // Sign-Up Menu Functions
  const handleSignupMenuOpen = (event) => {
    setSignupMenuAnchor(event.currentTarget);
  };

  const handleSignupMenuClose = () => {
    setSignupMenuAnchor(null);
  };

  const handleClose = () => {
    setLogin(""); // Resets the login state, closing the modal
  };

  // Set the specific login/signup view
  const handleMenuSelect = (value) => {
    setLogin(value);
    setLoginMenuAnchor(null);
    setSignupMenuAnchor(null);
  };

  // Search Handling
  const handleSearch = () => {
    console.log("Search:", searchText);
  };

  const carouselImages = [ "https://imgs.search.brave.com/AQbheVa5aoMYGphvbZjgNC8n1yFl5-vGo-LM_QnTVkI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA5LzQ4LzMzLzU5/LzM2MF9GXzk0ODMz/NTkyNV9Pd21VdkYy/SmY2Yk5TcW9EZkg3/MDhPVFg1U2pPNEFx/Vi5qcGc", "https://imgs.search.brave.com/Ea5Kd1Aq0AB1_NFFODbQlQr0q1fV5xPoisXBJrSKvU0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTMw/MDgyMjEwOC9waG90/by9ncm91cC1vZi11/bnJlY29nbmlzYWJs/ZS1pbnRlcm5hdGlv/bmFsLXN0dWRlbnRz/LWhhdmluZy1vbmxp/bmUtbWVldGluZy5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/LVg2SVVUU2RETWZK/ckZkUUZockR1d2hu/TXJNMUJMamZyTHp5/ZHBpYkNUQT0", "https://imgs.search.brave.com/7Wy4AUQkGuGxPZAoiKiHF5CZagpa-R9o8CeaJnzXaYk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTI5/MDg2NDk0Ni9waG90/by9lLWxlYXJuaW5n/LWVkdWNhdGlvbi1j/b25jZXB0LWxlYXJu/aW5nLW9ubGluZS5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/eTFmUS0zd2JzdmRE/YU1uLWN1SFBpYmNn/b3pPeEtRUzk5bUln/ejZERmNWQT0" ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      {/* Navbar */}
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#1976d2",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1100,
        }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Course Cloud
          </Typography>
          {/* Login Button */}
          <Button color="inherit" onClick={handleLoginMenuOpen}>
            Login
          </Button>
          <Menu
            anchorEl={loginMenuAnchor}
            open={Boolean(loginMenuAnchor)}
            onClose={handleLoginMenuClose}
          >
            <MenuItem onClick={() => handleMenuSelect("user-log")}>User</MenuItem>
            <MenuItem onClick={() => handleMenuSelect("faculty-log")}>
              Faculty
            </MenuItem>
            <MenuItem onClick={() => handleMenuSelect("admin-log")}>Admin</MenuItem>
          </Menu>
          {/* Sign-Up Button */}
          <Button color="inherit" onClick={handleSignupMenuOpen}>
            Sign Up
          </Button>
          <Menu
            anchorEl={signupMenuAnchor}
            open={Boolean(signupMenuAnchor)}
            onClose={handleSignupMenuClose}
          >
            <MenuItem onClick={() => handleMenuSelect("user-sign")}>User</MenuItem>
            <MenuItem onClick={() => handleMenuSelect("faculty-sign")}>
              Faculty
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
     {/* Hero Section */}
<Box
  sx={{
    padding: 4,
    paddingTop: { xs: "40%", md: "20%" },
    paddingBottom: "10%",
    textAlign: "center",
    backgroundColor: "#e3f2fd",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh", // Fix height to viewport height
    overflowY: "auto", // Enable vertical scrolling
  }}
>
  <Typography
    variant="h3"
    sx={{ marginBottom: 2, fontWeight: "bold", color: "#1976d2" }}
  >
    Empowering Students with Free Study Materials
  </Typography>
  <Typography
    variant="h6"
    sx={{ marginBottom: 4, color: "#424242" }}
  >
    Access notes, summaries, and answers from universities worldwide. Your
    learning journey starts here.
  </Typography>

  {/* Search Bar */}
  <Paper
    component="form"
    sx={{
      display: "flex",
      alignItems: "center",
      width: { xs: "90%", md: "50%" },
      padding: "2px 4px",
      marginBottom: 4,
    }}
    onSubmit={(e) => e.preventDefault()}
  >
    <InputBase
      sx={{ flex: 1 }}
      placeholder="Search for subjects, topics, or universities..."
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
    />
    <IconButton
      type="button"
      sx={{ padding: 1, backgroundColor: "#1976d2", color: "white" }}
      onClick={handleSearch}
    >
      <SearchIcon />
    </IconButton>
  </Paper>

  {/* Carousel */}
  <Box
    sx={{
      width: "90%",
      maxWidth: "1200px",
      margin: "0 auto",
      padding: 2,
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
      borderRadius: "10px",
      backgroundColor: "white",
    }}
  >
    <Slider {...settings}>
      {carouselImages.map((image, index) => (
        <Box key={index}>
          <img
            src={image}
            alt={`Slide ${index + 1}`}
            style={{
              width: "100%",
              height: "400px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
        </Box>
      ))}
    </Slider>
  </Box>
</Box>


      {/* Modal for Login/Signup */}
      {login && (
        <Box
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            zIndex: 1300,
          }}
        >
          <IconButton
            sx={{ position: "absolute", top: 10, right: 10 }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
          {{
            "user-log": <UserLog handleClose={() => setLogin("")} />,
            "faculty-log": <FacultyLog handleClose={() => setLogin("")} />,
            "admin-log": <AdminLog handleClose={() => setLogin("")} />,
            "user-sign": <UserSign handleClose={() => setLogin("")} />,
            "faculty-sign": <FacultySign handleClose={() => setLogin("")} />,
          }[login]}
        </Box>
      )}

      {/* Footer */}
      <Box
        sx={{
          backgroundColor: "#1976d2",
          color: "white",
          textAlign: "center",
          padding: 2,
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          zIndex: 1000,
        }}
      >
        <Typography>Course Cloud. All rights reserved.</Typography>
      </Box>
    </Box>
  );
};

export default Home;