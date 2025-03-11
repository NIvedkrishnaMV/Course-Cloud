import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './sstyle.css';

const AddCourse = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    courseName: '',
    years: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission to add a new course
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Send POST request to add the course
      await axios.post('http://localhost:3001/apit/add-course', formData);
      alert('Course added successfully!');
    } catch (err) {
      console.error('Error adding course:', err);
      setError('Failed to add course. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Add Course</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="courseName">Course Name:</label>
          <input
            type="text"
            id="courseName"
            name="courseName"
            value={formData.courseName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="years">Years:</label>
          <input
            type="number"
            id="years"
            name="years"
            value={formData.years}
            onChange={handleInputChange}
            required
            min="1"
          />
        </div>
        <button className='button' type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Add Course'}
        </button>
      </form>
    </div>
  );
};

export default AddCourse;