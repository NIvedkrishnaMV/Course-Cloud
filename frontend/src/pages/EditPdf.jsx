import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './Upload.css';

const EditPdf = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [university, setUniversity] = useState('');
  const [course, setCourse] = useState('');
  const [sem, setSem] = useState('');
  const navigate =useNavigate();

  const location = useLocation();
const pdfId = location.state?.pdfId;

useEffect(() => {
  console.log('pdfId:', pdfId); // Check if pdfId is being passed correctly
  if (!pdfId) {
    alert('Invalid PDF ID. Redirecting...');
    navigate('/landing', { replace: true });
  }
}, [pdfId, navigate]);

  useEffect(() => {
    const fetchPdfDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/apip/get-file/${pdfId}`);
        const data = response.data;
        setTitle(data.title);
        setAuthor(data.author);
        setUniversity(data.university);
        setCourse(data.course);
        setSem(data.sem);
      } catch (error) {
        console.error('Error fetching file details:', error);
      }
    };

    fetchPdfDetails();
  }, [pdfId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.put(`http://localhost:3001/apip/update-file/${pdfId}`, {
        title,
        author,
        university,
        course,
        sem,
      });

      if (result.data.status === 'ok') {
        alert('File details updated successfully');
        navigate('/landing', { replace: true });
      }
    } catch (error) {
      console.error('Error updating file details:', error);
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-navbar">
        <nav className="upload-navbar">
          <ul className="Lan-nav-links">
            <li>
              <Link to={'/landing', { replace: true }}>
                <button className="back-button">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.825 13L13.425 18.6L12 20L4 12L12 4L13.425 5.4L7.825 11H20V13H7.825Z"
                      fill="#1D1B20"
                    />
                  </svg>
                  &nbsp; Home
                </button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="upload-content">
        <div className="upload-details">
          <h1 className="heading">Edit File Details</h1>
          <label htmlFor="title">Title:</label>
          <input type="text" placeholder='File name' id='title' value={title} onChange={(e) => setTitle(e.target.value)} />
          <label htmlFor="course">Course name:</label>
          <select id="course" value={course} onChange={(e) => setCourse(e.target.value)}>
            <option value="">Select your Course</option>
            <option value="University A">University A</option>
            <option value="University B">University B</option>
            <option value="University C">University C</option>
          </select>
          <label htmlFor="university">University:</label>
          <select id="university" value={university} onChange={(e) => setUniversity(e.target.value)}>
            <option value="">Select your University</option>
            <option value="University A">University A</option>
            <option value="University B">University B</option>
            <option value="University C">University C</option>
          </select>

          <label htmlFor="semester">Semester:</label>
          <select id="semester" value={sem} onChange={(e) => setSem(e.target.value)}>
            <option value="">Select your Semester</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
          </select>
          <br />
          <br />
          <button id="uploadButton" onClick={handleSubmit}>Upload File</button>
        </div>
      </div>
    </div>
  );
};

export default EditPdf;