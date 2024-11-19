import React from 'react';
import './TeacherSign.css';
const TeacherSign = () => {
  return (
    <div className="container">
      <form className="form">
        <h2 className="title">Create an Account</h2>
        
        <div className="input-group">
          <label htmlFor="username" className="label">Username</label>
          <input type="text" id="username" name="username" required className="input" />
        </div>

        <div className="input-group">
          <label htmlFor="email" className="label">Email</label>
          <input type="email" id="email" name="email" required className="input" />
        </div>

        <div className="input-group">
          <label htmlFor="password" className="label">Password</label>
          <input type="password" id="password" name="password" required className="input" />
        </div>

        <div className="input-group">
          <label htmlFor="university" className="label">University</label>
          <select id="university" name="university" required className="input">
            <option value="">Select University</option>
            <option value="university1">University 1</option>
            <option value="university2">University 2</option>
            <option value="university3">University 3</option>
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="course" className="label">Course</label>
          <select id="course" name="course" required className="input">
            <option value="">Select Course</option>
            <option value="course1">Course 1</option>
            <option value="course2">Course 2</option>
            <option value="course3">Course 3</option>
          </select>
        </div>

        <button type="submit" className="button">Sign Up</button>

        <p className="login-prompt">
          Already a user? <a href="/login" className="login-link">Login</a>
        </p>
      </form>
    </div>
  );
};

export default TeacherSign;
