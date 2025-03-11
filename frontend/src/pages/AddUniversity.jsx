import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './sstyle.css';

const AddUniversity = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    universityName: '',
    place: '',
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

  // Handle form submission to add a new university
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Sending a POST request to add the university
      await axios.post('http://localhost:3001/apit/add-uni', formData);
      alert('University added successfully!');
    } catch (err) {
      console.error('Error adding university:', err);
      setError('Failed to add university. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Add University</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="universityName">University Name:</label>
          <input
            type="text"
            id="universityName"
            name="universityName"
            value={formData.universityName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="place">Place:</label>
          <input
            type="text"
            id="place"
            name="place"
            value={formData.place}
            onChange={handleInputChange}
            required
          />
        </div>
        <button className='button' type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Add University'}
        </button>
      </form>
    </div>
  );
};

export default AddUniversity;
