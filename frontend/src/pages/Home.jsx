import React from 'react';
import './style.css';
import logo from './logo.jpg'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';

const Home = () => {
  
  //this it for the searchBar
  const [searchText, setSearchText] = useState('');
  const handleSearch = () =>{
    console.log('clicked');
  }
  const handleClear = () => {
    setSearchText('');
  };

 //overlay menu shows the loginPage
 const [isModalOpen, setIsModalOpen] = useState(false);
 const openModal = () => setIsModalOpen(true);
 const closeModal = () => setIsModalOpen(false);
 
//for the signUp page
const [isSignUpOpen, setIsSignUpOpen] = useState(false);
const openSignUp = () => setIsSignUpOpen(true);
const closeSignUp = () => setIsSignUpOpen(false)
 
 
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
           <button onClick={openModal} className="logBtn">Login</button>
           <Login isOpen={isModalOpen} onClose={closeModal}></Login>

            <button className='signBtn' onClick={openSignUp}>SignUp</button>          
           {/* <Signup isOpen={isSignUpOpen} onClose={closeSignUp}></Signup > */}

           
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
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.6 18L10.3 11.7C9.8 12.1 9.225 12.4167 8.575 12.65C7.925 12.8833 7.23333 13 6.5 13C4.68333 13 3.14583 12.3708 1.8875 11.1125C0.629167 9.85417 0 8.31667 0 6.5C0 4.68333 0.629167 3.14583 1.8875 1.8875C3.14583 0.629167 4.68333 0 6.5 0C8.31667 0 9.85417 0.629167 11.1125 1.8875C12.3708 3.14583 13 4.68333 13 6.5C13 7.23333 12.8833 7.925 12.65 8.575C12.4167 9.225 12.1 9.8 11.7 10.3L18 16.6L16.6 18ZM6.5 11C7.75 11 8.8125 10.5625 9.6875 9.6875C10.5625 8.8125 11 7.75 11 6.5C11 5.25 10.5625 4.1875 9.6875 3.3125C8.8125 2.4375 7.75 2 6.5 2C5.25 2 4.1875 2.4375 3.3125 3.3125C2.4375 4.1875 2 5.25 2 6.5C2 7.75 2.4375 8.8125 3.3125 9.6875C4.1875 10.5625 5.25 11 6.5 11Z" fill="#1D1B20"/>
            </svg>
          </button>
          </div>
        </div>
        <footer className='footer'>
        <p> Course Cloud. All rights reserved.</p>
      </footer>
      </div>
    </div>
  )
}

export default Home