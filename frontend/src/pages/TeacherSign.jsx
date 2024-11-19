import React, { useState } from 'react';
import './TeacherSign.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const TeacherSign = () => {

  const [tname, setTname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [university, setUniversity] = useState('');
  const [course, setCourse] = useState('');
  const navigate =useNavigate();

  const handleSubmit=async(event)=>{
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
  return (
    <div className="container">
      <form className="form">
        <h2 className="title">Create an Account</h2>
        
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

        <button type="submit" onClick={handleSubmit} className="button">Sign Up</button>

        <p className="login-prompt">
          Already a user? <a href="/login" className="login-link">Login</a>
        </p>
      </form>
    </div>
  );
};

export default TeacherSign;
