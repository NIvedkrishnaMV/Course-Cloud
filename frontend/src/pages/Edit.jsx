import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Edit = () => {
  const location = useLocation();
  const { user } = location.state || {};
  const navigate =useNavigate();
   

  const [formData, setFormData] = useState({
    tname: user?.tname || '',
    email: user?.email || '',
    password: user?.password || '',
    age: user?.age || '',
  });
  const goHome=()=>{
    setName('')
    setProfiles([])
    navigate('/profile', { replace: true })
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); // Update form data dynamically
  };
 

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3001/apit/edit/${user._id}`, formData) // Send updated data
      .then((response) => {
        alert('Profile updated successfully!');
        navigate('/profile', { replace: true, state: { isTeacher: true } });
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
        alert('Failed to update profile.');
      });
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Username:</label>
          <input
            type="text"
            name="uname"
            value={formData.tname}
            onChange={handleChange}
            required
            style={{ display: 'block', width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ display: 'block', width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ display: 'block', width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            style={{ display: 'block', width: '100%', padding: '8px' }}
          />
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            padding: '10px 15px',
            cursor: 'pointer',
            borderRadius: '5px',
          }}
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Edit;