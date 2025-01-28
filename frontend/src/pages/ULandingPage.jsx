import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './landingPage.css';
import './Card.css';
import { Link, useNavigate } from 'react-router-dom';


function ULandingPage() {
  const [allPdf, setAllPdf] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [menuToggle,setMenuToggle]=useState(false);





  const navigate = useNavigate();

  const showMenu=()=>{
    setMenuToggle(prevState => !prevState);
  }

  const handleLogOut=async()=>{
    await axios.delete("http://localhost:3001/apiu/logout");
    alert("Logged Out");
    navigate('/');
  }

  const handlepro=()=>{
    navigate('/profile');
  }

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

  const goHome=()=>{
    navigate('/ulanding');
}

  return (
    <div className="Lan-container">
            <img className='lph' src="https://static.vecteezy.com/system/resources/previews/004/495/548/original/light-soft-color-blue-low-poly-crystal-background-polygon-design-pattern-low-poly-illustration-low-polygon-background-free-vector.jpg" alt="" />
      <nav className="Lan-navbar">
        <div className="empty"></div>
          <ul className="Lan-nav-links">
            <li><button className='Lan-homebtn' onClick={()=>goHome()}>Home</button></li>
            {/* profile btn */}
            <li><button className='profileBtn' onClick={()=>handlepro()}><svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="34px" fill="#fff"><path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"/></svg></button></li>
            {/* logout button */}
            <li><button className='profileBtn' onClick={()=>handleLogOut()}>
            <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="34px" fill="#fff"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>
              </button></li>
          </ul>
        </nav>
      <div className="Lan-body">
        
          <div className="div2">
          {allPdf && allPdf.map(data => (
            <div key={data.pdf} className="card">
              <h2 className='card-title'>{data.title}</h2>
              <p className='card-description'>{data.description}</p>
              <button className='card-button' onClick={() => handleShowPdf(data._id)}>Show PDF</button>
            </div>
          ))}
          </div>
        </div>
         
        
        
          
          {/* <div className="search-bar">
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
          </div> */}
    </div>
  );
}

export default ULandingPage;