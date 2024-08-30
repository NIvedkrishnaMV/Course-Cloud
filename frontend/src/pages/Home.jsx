import React from 'react';
import './style.css';
import logo from './logo.jpg'
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () =>{
    console.log('clicked');
  }
  const handleClear = () => {
    setSearchText('');
  };
  return (
    <div className="home">
      <div className='ImageContainer' ><div className="image"></div></div>
      <div className="bgTint"></div> 
      <div className="navbarin">
        <div className="logo"><img src={logo} alt="Logo" height={"100%"} width={'100%'}/></div>
        <div className="CourseCloud"><h1>Course Cloud</h1></div>
      </div>
      <div className="home-items">
        <div className="navbar">
          <div className="buttons">
            <Link to={"/login"}><button className="logBtn">Login</button></Link>
           <Link to={"/signup"}> <button className='signBtn'>Sign Up</button></Link>
          </div> 
        </div>
        
        <h1 className="heading1">Free study notes, summaries &<br />&nbsp;&nbsp;&nbsp; answers for your studies</h1>
        <div className="contents">
          
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
            <svg width="20" height="20" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M18 20C23.5228 20 28 15.5228 28 10C28 4.47716 23.5228 0 18 0C12.4772 0 8 4.47716 8 10C8 15.5228 12.4772 20 18 20ZM18 17C21.866 17 25 13.866 25 10C25 6.134 21.866 3 18 3C14.134 3 11 6.134 11 10C11 13.866 14.134 17 18 17Z" fill="white"/>
                <path d="M1.53764 23.5545L7.53764 18.0545C10.3376 17.6545 10.0376 19.5545 9.53764 20.5545L3.53764 26.0545C1.13764 26.8545 0.36854 24.5 1.53764 23.5545Z" fill="white" stroke="white"/>
            </svg>
          </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home