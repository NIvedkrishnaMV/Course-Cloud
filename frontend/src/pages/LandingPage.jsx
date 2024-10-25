// LandingPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './landingPage.css';
import { pdfjs } from "react-pdf";
import './Card.css';
import { Link, useNavigate } from 'react-router-dom';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

function LandingPage() {
  const [allPdf, setAllPdf] = useState(null);
  const [pdf, setPdf] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getPdf();
  }, []);

  const getPdf = async () => {
    const result = await axios.get("http://localhost:3001/apip/view");
    setAllPdf(result.data.data);
    console.log(result.data.data);
  }

  const handleShowPdf = (pdfData) => {
    setPdf('')
    navigate('/pdf', { state: { pdf: pdfData } });
  };

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
      <br />
      <div className="Lan-cards-container">
        {allPdf && allPdf.map((pdf, index) => (
          <div className="card" key={index}>
            <h2 className="card-title">{pdf.title}</h2>
            <p className="card-description">{pdf.description}</p>
            <button className="card-button" onClick={() => handleShowPdf(pdf)}>Show PDF</button>
          </div>
        ))}
      </div>
      <div className="Lan-side-navbar">
        <div className="Lan-div1">
          <button className="sNavbutton">News Feed</button>
          <button className="sNavbutton">Courses</button>
        </div>
        <div className="Lan-div2">
          <Link to={'/upload'}>
            <button className="sNavbutton">Add</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;