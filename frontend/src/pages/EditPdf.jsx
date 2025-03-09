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
    navigate('/landing');
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
        navigate('/landing');
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
              <Link to={'/landing'}>
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
        <div className="upload-form">
          <h1 className="heading">Edit Your PDF Details</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="File Name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <br />
            <br />
            <button id="uploadButton" type="submit">
              Update Details
            </button>
          </form>
        </div>
        <div className="upload-details">
          <h1 className="heading">Edit File Details</h1>
          <input
            type="text"
            placeholder="Author Name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <br />
          <br />
          <input
            type="text"
            placeholder="Course Name"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          />
          <br />
          <br />
          <input
            type="text"
            placeholder="University"
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
          />
          <br />
          <br />
          <input
            type="text"
            placeholder="Semester"
            value={sem}
            onChange={(e) => setSem(e.target.value)}
          />
          <br />
          <br />
        </div>
      </div>
    </div>
  );
};

export default EditPdf;