import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './landingPage.css';
import './Card.css';
import { Link, useNavigate } from 'react-router-dom';


function LandingPage() {
  const [allPdf, setAllPdf] = useState(null);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    console.log('clicked');
  }

  const handleClear = () => {
    setSearchText('');
  };

  useEffect(() => {
    getPdf();
  }, []);

  const getPdf = async () => {
    const result = await axios.get("http://localhost:3001/apip/view");
    setAllPdf(result.data.data);
  };

  const handleShowPdf = (pdf) => {
    const pdfId = pdf; 
    navigate('/pdf', { state: { pdfId } });
  };

  return (
    <div className="Lan-container">
      <div className="Lan-left">
        <nav className="Lan-navbar">
          {/* searchBar */}
          <div className="search-bar">
            <input
              type="text"
              id='search-input'
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search..."
            />&nbsp;
            <button onClick={handleClear} id="clear-button">X</button>
            <button onClick={handleSearch} id="search-button">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.6 18L10.3 11.7C9.8 12.1 9.225 12.4167 8.575 12.65C7.925 12.8833 7.23333 13 6.5 13C4.68333 13 3.14583 12.3708 1.8875 11.1125C0.629167 9.85417 0 8.31667 0 6.5C0 4.68333 0.629167 3.14583 1.8875 1.8875C3.14583 0.629167 4.68333 0 6.5 0C8.31667 0 9.85417 0.629167 11.1125 1.8875C12.3708 3.14583 13 4.68333 13 6.5C13 7.23333 12.8833 7.925 12.65 8.575C12.4167 9.225 12.1 9.8 11.7 10.3L18 16.6L16.6 18ZM6.5 11C7.75 11 8.8125 10.5625 9.6875 9.6875C10.5625 8.8125 11 7.75 11 6.5C11 5.25 10.5625 4.1875 9.6875 3.3125C8.8125 2.4375 7.75 2 6.5 2C5.25 2 4.1875 2.4375 3.3125 3.3125C2.4375 4.1875 2 5.25 2 6.5C2 7.75 2.4375 8.8125 3.3125 9.6875C4.1875 10.5625 5.25 11 6.5 11Z" fill="#1D1B20"/>
              </svg>
            </button>
          </div>
        
          {/* buttons */}
          <ul className="Lan-nav-links">
            <li><button>Home</button></li>
            <li><button>About</button></li>
            <li><button>Contact</button></li>
          </ul>
        </nav>
        <div className="Lan-cards-container">
          {allPdf && allPdf.map(data => (
            <div key={data.pdf} className="card">
              <h2 className='card-title'>{data.title}</h2>
              <p className='card-description'>{data.description}</p>
              <button className='card-button' onClick={() => handleShowPdf(data._id)}>Show PDF</button>
            </div>
          ))}
        </div>
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