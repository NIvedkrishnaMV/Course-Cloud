import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './landingPage.css';
import './Card.css';
import { Link, useNavigate } from 'react-router-dom';
import { IconButton, Typography } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import DeleteIcon from '@mui/icons-material/Delete';

function ULandingPage() {
  const [allPdf, setAllPdf] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [menuToggle, setMenuToggle] = useState(false);

  const [filteredPdf, setFilteredPdf] = useState([]); // Store filtered PDFs
  const [courseFilter, setCourseFilter] = useState(''); // Selected course filter
  const [universityFilter, setUniversityFilter] = useState('');
  const [courseOptions, setCourseOptions] = useState([]); // Store courses from API
  const [universityOptions, setUniversityOptions] = useState([]); // Store universities from API

  const navigate = useNavigate();

  // Fetch courses and universities
  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const result = await axios.get('http://localhost:3001/apit/uni-view');
        setUniversityOptions(result.data.data || []); // Default to an empty array
      } catch (error) {
        console.error('Error fetching universities:', error);
      }
    };

    const fetchCourses = async () => {
      try {
        const result = await axios.get('http://localhost:3001/apit/cors-view');
        setCourseOptions(result.data.data || []); // Default to an empty array
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
    fetchUniversities();
  }, []);

  // Fetch PDFs
  useEffect(() => {
    const getPdf = async () => {
      try {
        const result = await axios.get('http://localhost:3001/apip/view');
        setAllPdf(result.data.data);
        setFilteredPdf(result.data.data); 
      } catch (error) {
        console.error('Error fetching PDFs:', error);
      }
    };

    getPdf();
  }, []);

  // Apply filter when course or university filter changes
  useEffect(() => {
    const applyFilter = () => {
      if (!allPdf) return;

      const filtered = allPdf.filter((pdf) => {
        const matchesCourse = courseFilter ? pdf.course === courseFilter : true;
        const matchesUniversity = universityFilter
          ? pdf.university === universityFilter
          : true;
        return matchesCourse && matchesUniversity;
      });

      setFilteredPdf(filtered);
    };

    applyFilter();
  }, [courseFilter, universityFilter, allPdf]);

  // Navigation and utility functions
  const handleShowPdf = (pdf) => {
    const pdfId = pdf;
    navigate('/pdf', { state: { pdfId } });
  };

  const handleLogOut = async () => {
    try {
      const userConfirmed = window.confirm("Do you want to proceed?");
    
      if (userConfirmed) {
        sessionStorage.clear();
        alert("Logged Out");
        navigate('/', { replace: true });
      } 
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  const handlepro = () => {
    navigate('/uprofile');
  };

  


  return (
    <div className="Lan-container">
      <img
        className="lph"
        src="https://static.vecteezy.com/system/resources/previews/004/495/548/original/light-soft-color-blue-low-poly-crystal-background-polygon-design-pattern-low-poly-illustration-low-polygon-background-free-vector.jpg"
        alt=""
      />
      <nav className="Lan-navbar">
        <div className='d1'>
      <Typography
        sx={{
          color: 'white',
          fontSize: 25
        }}
      >
        Course Cloud
      </Typography>
        </div>
          <ul className="Lan-nav-links">
          <li>
            <div className="filter">
          <IconButton className='filter-btn'>
            <FilterAltIcon sx={{color: 'White',fontSize: '30px', }}/>
          </IconButton>
          <div className="filter-menu">
            {/* Dropdown for university filter */}
            <div className="filter-option">
              Filter by University
              <div className="inner-options">
                <div
                  onClick={() => setUniversityFilter('')}
                >
                  All University
                </div>
                {universityOptions.map((uni) => (
                  <div
                    key={uni.universityName}
                    onClick={() => setUniversityFilter(uni.universityName)}
                  >
                    {uni.universityName}
                  </div>
                ))}
              </div>
            </div>

            {/* Dropdown for course filter */}
            <div className="filter-option">
              Filter by Course
              <div className="inner-options">
                <div
                   onClick={() => setCourseFilter('')}
                >
                  All Courses
                </div>
                {courseOptions.map((course) => (
                  <div
                    key={course.courseName}
                    onClick={() => setCourseFilter(course.courseName)}
                  >
                    {course.courseName}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
            </li>
            <li><button className='Lan-homebtn'>Home</button></li>
            
            <li>
            <button className="profileBtn" onClick={handlepro}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="30px"
                viewBox="0 -960 960 960"
                width="34px"
                fill="#fff"
              >
                <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" />
              </svg>
            </button>
          </li>
            {/* logout button */}
            <li><button className='profileBtn' onClick={()=>handleLogOut()}>
            <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="34px" fill="#fff"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>
              </button></li>
          </ul>
        </nav>
      <div className="Lan-body">
        <div className="div2">
          {filteredPdf &&
            filteredPdf.map((data) => (
              <div key={data.pdf} className="card">
                <h2 className="card-title">{data.title}</h2>
                <p className="card-description">Author: {data.author}</p>
                <p className="card-description">
                  University: {data.university}
                </p>
                <p className="card-description">Course: {data.course}</p>
                <button
                  className="card-button"
                  onClick={() => handleShowPdf(data._id)}
                >
                  Show PDF
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ULandingPage;
