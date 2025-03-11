import React from 'react';
import logo from './logo.jpg'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TeacherSign.css';
import axios from 'axios'
import './Modal.css';
import './style.css';


const Home = () => {
  
  //this it for the searchBar
  const [searchText, setSearchText] = useState('');

  
  const handleSearch = () =>{
    console.log('clicked');
  }
  const handleClear = () => {
    setSearchText('');
  };
  // User login page
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate =useNavigate();
  
  const handleULSubmit =async(event)=>{
    event.preventDefault();
    try {
      if (email === '' || password === '') {
        alert("You missed a value");
      } else {
        const response = await axios.post('http://localhost:3001/apiu/log', {email,password});
        if (response.status === 200) {
          if(response.data.isAdmin){
            alert("Welcome Admin");
            navigate('/admin', { replace: true });
          }
          else{
            alert("Welcome User");
            navigate('/ulanding', { replace: true });
          }
        }
        else if (response.status === 404) {
          const errorMessage = response.data;
          if (errorMessage === 'Email not registered') {
            alert('Email not registered');
          }
          else if(errorMessage === 'Incorrect password'){
            alert('Incorrect password');
          } else {
            alert("Error logging in");
          }
        } else {
          alert("Error logging in");
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          alert("Error logging in: " + error.response.data);
        } else {
          alert("Couldn't log in");
        }
      } else {
        console.error(error);
        alert("An unexpected error occurred");
      }
    }    
  }

  // user signUp page

  const [uname, setUname] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');

  const handleGenderChange = (event) => {
      setGender(event.target.value);
    };

 const handleUSSubmit=async(event)=>{
  event.preventDefault();
  try {
    const res= await axios.post("http://localhost:3001/apiu/reg",{
      uname,
      email,
      password,
      age,
      gender,
      phone
    });

 

    if(uname===''||email===''||password===''||age===''||gender===''||phone===''){
      alert("You missed value");
    }
    else if(res.status ===200){
      alert("registered successfully");
      navigate('/', { replace: true });
    }
    else{
      alert('Login Failed')
    }
  } catch (error) {
    alert('Login Error');
  }
 }
//  faculty login page
  
  const handleFLSubmit =async(event)=>{
    event.preventDefault();
    try {
      if (email === '' || password === '') {
        alert("You missed a value");
      } else {
        const response = await axios.post('http://localhost:3001/apit/log', {email,password});
        if (response.status === 200) {
            alert("Welcome User");
            navigate('/landing', { replace: true });
        }
        else if (response.status === 404) {
          const errorMessage = response.data;
          if (errorMessage === 'Email not registered') {
            alert('Email not registered');
          }
          else if(errorMessage === 'Incorrect password'){
            alert('Incorrect password');
          } else {
            alert("Error logging in");
          }
        } else {
          alert("Error logging in");
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          alert("Error logging in: " + error.response.data);
        } else {
          alert("Couldn't log in");
        }
      } else {
        console.error(error);
        alert("An unexpected error occurred");
      }
    }    
  }
  // faculty sign in
  const [tname, setTname] = useState('');
  const [university, setUniversity] = useState('');
  const [course, setCourse] = useState('');

  const handleFSSubmit=async(event)=>{
    event.preventDefault();
    try {
      const res= await axios.post("http://localhost:3001/apit/reg",{
        tname,
        email,
        password,
        age
      });
      if(tname===''||email===''||password===''||age===''){
        alert("You missed value");
      }
      else if(res.status ===200){
        alert("registered successfully");
        window.location.reload();
      }
      else{
        alert('Login Failed')
      }
    } catch (error) {
      alert('Login Error');
    }
   }




 const [isLoginOpen, setIsLoginOpen] = useState(false);
 const [isSignUpOpen, setIsSignUpOpen] = useState(false);
 
 const [userLog , setUserlog]=useState(false);
 const [facultyLog , setFacultylog]=useState(false);
 const [adminLog , setAdminlog]=useState(false);
 const [userSign , setUsersign]=useState(false);
 const [facultySign , setFacultysign]=useState(false);

 const openLogin =()=>{
  setIsLoginOpen(prevstate => !prevstate);
  setIsSignUpOpen(false);
 }
 const openSignUp =()=>{
  setIsSignUpOpen(prevstate => !prevstate);
  setIsLoginOpen(false);
 }
 const closeAll=()=>{
  setIsLoginOpen(false);
  setIsSignUpOpen(false);
 }

const handleUlog =()=>{
  setUserlog(true);
  setUsersign(false);
}


const handleFlog =()=>{
 setFacultylog(true);
 setFacultysign(false);
}


const handleAlog =()=>{
  setAdminlog(true);
}


const handleUsign =()=>{
  setUsersign(true);
  setUserlog(false);
}


const handleFsign =()=>{
  setFacultysign(true);
  setFacultylog(false);
} 

const handleClose=()=>{
  setUserlog(false);
  setFacultylog(false);
  setAdminlog(false);
  setUsersign(false);
  setFacultysign(false);
}

 
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
            <div className="logBtn"> <button onClick={openLogin}>Login</button>
                <div className={`btnMenu ${isLoginOpen? 'show' : ''}`} >
                  <ul >
                    <li><button className="logbtns" onClick={handleUlog}>User</button></li>
                    <li><button className="logbtns" onClick={handleFlog}>Faculty</button></li>
                    <li><button className="logbtns" onClick={handleAlog}>Admin</button></li>
                  </ul>
                </div>
            </div>
            <div className="logBtn"> <button onClick={openSignUp} >Signup</button>
                <div className={`btnMenu ${isSignUpOpen? 'show' : ''}`} >                
                  <ul>
                    <li><button className="logbtns" onClick={handleUsign}>User</button></li>
                    <li><button className="logbtns" onClick={handleFsign}>Faculty</button></li>
                  </ul>              
                </div>
            </div>          
            
           
          </div> 
        </div>
        

        {/* User login page */}
        { userLog &&(
        
        <div className="modal-overlay">
          <div className="modal-content">
              <button className="close-button" onClick={handleClose}>X</button>
              <h1>Login</h1>
              <form>
                  <label htmlFor="email" className="email-input-label">Email</label>
                  <input
                      className='email-input'
                      type="text"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                  /><br /><br />
                  <label htmlFor="password" className="password-input-label">Password</label>
                  <input
                      className='password-input'
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                  /><br />
                  <br />
                  <button className="login-btn" onClick={handleULSubmit} type="submit">Log In</button><br />
                  
              </form>
              <h4 className="newuserp">New User? <a onClick={handleUsign}>Signup</a></h4>
          </div>
        </div>
      
        )}

        {/* User signUp page */}
       {userSign &&(
         <div className="modal-overlay">
         <div className="modal-content">
         <button className="close-button" onClick={handleClose}>X</button>
         <h1>User Signup</h1>
         <form className='sign-form' onSubmit={handleUSSubmit}>
             <label htmlFor="uname">Name</label>
             <input
                 type="text"
                 id="uname"
                 onChange={(e) => setUname(e.target.value)}
                 required
             />

             <label htmlFor="email">Email</label>
             <input
                 type="email"
                 id="email"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 required
             />

             <label htmlFor="password">Password</label>
             <input
                 type="password"
                 id="password"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 required
             />

             <label htmlFor="age">Age</label>
             <input
                 type="number"
                 id="age"
                 value={age}
                 onChange={(e) => setAge(e.target.value)}
                 required
             />
          <label>Gender</label>
            <div className='gender'>
              <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  onChange={handleGenderChange}
                  checked={gender === 'male'}
              />
              <label htmlFor="male">Male</label>

              <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  onChange={handleGenderChange}
                  checked={gender === 'female'}
              />
              <label htmlFor="female">Female</label>
              </div>
              <label htmlFor="phone">Phone</label>
              <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter phone number"
                  pattern="[0-9]{10}" 
                  required
              />

              <button type="submit" className='login-btn'>Sign Up</button>
            </form>
          </div>
        </div>
        )}

        {/* Admin login page */}
        {adminLog && (
          <div className="modal-overlay">
          <div className="modal-content">
              <button className="close-button" onClick={handleClose}>X</button>
              <h1>Admin Login</h1>
              <form>
              <label htmlFor="email" className="email-input-label">Email</label>
                  <input
                      className='email-input'
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                  /><br /><br />
                  <label htmlFor="email" className="email-input-label">Password</label>
                  <input
                      className='password-input'
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                  /><br />
                    <br />
                  <button className="login-btn" onClick={handleULSubmit} type="submit">Log In</button><br />
              </form>
          </div>
          </div>
        )}

        {/* faculty login page */}
        {facultyLog && (
          <div className="modal-overlay">
          <div className="modal-content">
             <button className="close-button" onClick={handleClose}>X</button>
              <h1>Faculty Login</h1>
              <form>
              <label htmlFor="email" className="email-input-label">Email</label>
                  <input
                      className='email-input'
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                  /><br /><br />
                  <label htmlFor="email" className="email-input-label">Password</label>
                  <input
                      className='password-input'
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                  /><br />
                    <br />
                  <button className="login-btn" onClick={handleFLSubmit} type="submit">Log In</button><br />
                  <div className="newuserp"><h4>New User?<a onClick={handleFsign}>Signup</a></h4></div>
              </form>
          </div>
          </div>
        )}
        {/* faculty Sign in */}
        {facultySign && (
        <div className="modal-overlay">
          <div className="modal-content">
          <button className="close-button" onClick={handleClose}>X</button>
          <h1>Teacher Signup</h1>
          <form className='sign-form' onSubmit={handleFSSubmit}>
              <label htmlFor="tname">Name</label>
              <input
                  type="text"
                  id="tname"
                  value={tname}
                  onChange={(e) => setTname(e.target.value)}
                  required
              />

              <label htmlFor="email">Email</label>
              <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
              />

              <label htmlFor="password">Password</label>
              <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
              />

              <label htmlFor="age">Age</label>
              <input
                  type="number"
                  id="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
              />


              <button type="submit" className='login-btn'>Sign Up</button>
          </form>
          </div>
        </div>
        )}

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
