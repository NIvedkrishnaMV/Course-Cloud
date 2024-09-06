import React from 'react'
import './landingPage.css';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();
    const handleNav = () => {
        navigate('/upload');
      };
  return (
    <div className="page-container">
    <nav className="Landing-navbar">
      <div className="Landing-search-bar">
        <input type="search" placeholder="Search" />
        <button>Search</button>
      </div>
      <ul className="Landing-nav-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
    <div className="Landing-side-navbar">
      <div className="Landing-div1">
      <button className="sNavbutton">News Feed</button>
      <button className="sNavbutton">Courses</button>
      </div>
      <div className="Landing-div2">
      <button className="sNavbutton" onClick={() => handleNav('/upload')}>Add</button>
      </div>
    </div>
  </div>
  )
}

export default LandingPage