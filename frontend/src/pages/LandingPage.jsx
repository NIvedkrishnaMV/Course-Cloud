import React from 'react';
import './landingPage.css';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="container">
      <nav className="navbar">
        <div className="search-bar">
          <input type="search" placeholder="Search" />
          <button>Search</button>
        </div>
        <ul className="nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
      <div className="side-navbar">
        <div className="div1">
        <button class="sNavbutton">News Feed</button>
        <button class="sNavbutton">Courses</button>
        </div>
        <div className="div2">
        <Link to={'/upload'}><button class="sNavbutton">Add</button></Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;