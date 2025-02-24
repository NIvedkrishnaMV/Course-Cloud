import React from 'react';
import './style.css';
import logo from './logo.jpg'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TeacherSign.css';
import axios from 'axios'
import './modal.css';


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
            navigate('/admin');
          }
          else{
            alert("Welcome User");
            navigate('/ulanding');
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
      navigate('/');
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
            navigate('/landing');
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
        age,
        university,
        course
      });
      if(tname===''||email===''||password===''||age===''||university===''||course===''){
        alert("You missed value");
      }
      else if(res.status ===200){
        alert("registered successfully");
        navigate('/');
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
                  <input
                      className='email-input'
                      type="text"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                  /><br /><br />
                  <input
                      className='password-input'
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                  /><br />
                    <br />
                  <button className="login-btn" onClick={handleULSubmit} type="submit">Log In</button><br />
                  <div className="newuser"><h4>New User? <a onClick={handleUsign}>Signup</a></h4></div>
              </form>
          </div>
          </div>
        )}

        {/* User signUp page */}
       {userSign &&(
         <div className='modal-overlay'>
          <div  className="modal-content">
            <button className="close-button" onClick={handleClose}>X</button>
              <h1>SignUp</h1>
              <br /><br />
              <input type="text" className='inputs-style' onChange={(e) => setUname(e.target.value)} placeholder="Username"  />
              <br /><br />
              <input type="email" className='inputs-style' onChange={(e) => setEmail(e.target.value)}  placeholder="Email" />
              <br /><br />
              <input type="password" className='inputs-style' onChange={(e) => setPassword(e.target.value)}  placeholder="Password" />
              <br /><br />
              <div className="gend-style">
              <label>
              Gender:
                <input 
                  type="radio" 
                  name="gender" 
                  value="male" 
                  checked={gender === 'male'} 
                  onChange={handleGenderChange} 
                />
                Male
              </label>&nbsp;&nbsp;
              <label>
                <input 
                  type="radio" 
                  name="gender" 
                  value="female" 
                  checked={gender === 'female'} 
                  onChange={handleGenderChange} 
                />
                Female
              </label>
              </div>
              <br /><br />
              <input type="text" className='inputs-style' onChange={(e) => setAge(e.target.value)}  placeholder="Age" />
              <br /><br />
              <input type="text" className='inputs-style' onChange={(e) => setPhone(e.target.value)}  placeholder="Phone Number" />
              <br /><br />
              
              <button type="submit" className='sign-btn' onClick={handleUSSubmit} >Sign Up</button>
              <p className="login-prompt">
                Already a user? <a onClick={handleUlog} >Login</a>
               </p>
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
                  <input
                      className='email-input'
                      type="text"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                  /><br /><br />
                  <input
                      className='password-input'
                      type="password"
                      placeholder="Password"
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
                  <input
                      className='email-input'
                      type="text"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                  /><br /><br />
                  <input
                      className='password-input'
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                  /><br />
                    <br />
                  <button className="login-btn" onClick={handleFLSubmit} type="submit">Log In</button><br />
                  <div className="newuser"><h4>New User?<a onClick={handleFsign}>Signup</a></h4></div>
              </form>
          </div>
          </div>
        )}
        {/* faculty Sign in */}
        {facultySign && (
          <div className="modal-overlay">
          <div className="form">
            <div className="title">
            <h2 >Create an Account</h2>
            <button className='close' onClick={handleClose}>X</button>
            </div>
            <div className="input-group">
              <label htmlFor="username" className="label">Username</label>
              <input type="text" id="username" onChange={(e) => setTname(e.target.value)} name="username" required className="input" />
            </div>
    
            <div className="input-group">
              <label htmlFor="email" className="label">Email</label>
              <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} name="email" required className="input" />
            </div>
    
            <div className="input-group">
              <label htmlFor="password" className="label">Password</label>
              <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} name="password" required className="input" />
            </div>
    
            <div className="input-group">
              <label htmlFor="password" className="label">Age</label>
              <input type="text" id="age" onChange={(e) => setAge(e.target.value)} name="age" required className="input" />
            </div>
    
            <div className="input-group">
              <label htmlFor="university" className="label">University</label>
              <select id="university" onChange={(e) => setUniversity(e.target.value)} name="university" required className="input">
                <option value="">Select University</option>
                <option value="university1">University 1</option>
                <option value="university2">University 2</option>
                <option value="university3">University 3</option>
              </select>
            </div>
    
            <div className="input-group">
              <label htmlFor="course" className="label">Course</label>
              <select id="course" onChange={(e) => setCourse(e.target.value)} name="course" required className="input">
                <option value="">Select Course</option>
                <option value="course1">Course 1</option>
                <option value="course2">Course 2</option>
                <option value="course3">Course 3</option>
              </select>
            </div>
    
            <button type="submit" onClick={handleFSSubmit} className="button">Sign Up</button>
    
            <p className="login-prompt">
              Already a user? <a onClick={handleFlog} className="login-link">Login</a>
            </p>
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
