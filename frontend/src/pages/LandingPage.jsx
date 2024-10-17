import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './landingPage.css';
import { Link } from 'react-router-dom';

function LandingPage() {


  const [allPdf, setAllPdf] = useState(null);

useEffect(()=>{
  getPdf();
},[])

const getPdf=async ()=>{
  const result=await axios.get("http://localhost:3001/apip/view");
  setAllPdf(result.data.data);
  console.log( result.data.data);
}


  return (
    <div className="Lan-container">
      <nav className="Lan-navbar">
        <div className="Lan-search-bar">
          <input type="search" placeholder="Search" />
          <button>Search</button>
        </div>
        <ul className="Lan-nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
      <div className="Lan-side-navbar">
        <div className="Lan-div1">
        <button class="sNavbutton">News Feed</button>
        <button class="sNavbutton">Courses</button>
        </div>
        <div className="Lan-div2">
        <Link to={'/upload'}>
        <button class="sNavbutton">Add</button></Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;