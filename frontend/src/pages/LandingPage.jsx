import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './landingPage.css';
import './Card.css'
import { Link, useNavigate } from 'react-router-dom';


function LandingPage() {
  const [allPdf, setAllPdf] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [menuToggle,setMenuToggle]=useState(false);

  const [filteredPdf, setFilteredPdf] = useState([]); // Store filtered PDFs
  const [courseFilter, setCourseFilter] = useState(''); // Selected course filter
  const [universityFilter, setUniversityFilter] = useState('');
  const [courseOptions, setCourseOptions] = useState([]); // Store courses from API
  const [universityOptions, setUniversityOptions] = useState([]);




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

  const showMenu=()=>{
    setMenuToggle(prevState => !prevState);
  }

  const handleLogOut = async () => {
    try {
      const userConfirmed = window.confirm("Do you want to proceed?");
    
      if (userConfirmed) {
        axios.delete("http://localhost:3001/apiu/logout");
        sessionStorage.clear();
        alert("Logged Out");
        navigate('/', { replace: true });
      } else {
        navigate('/landing', { replace: true }) 
      } 
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Failed to log out. Please try again.");
    }
  };
  

  const handleSearch = () => {
    console.log('clicked');
  }

  const handleClear = () => {
    setSearchText('');
  };

  useEffect(() => {
    const fetchData = async () => {
      await getPdf();
    };
    fetchData();
  }, []);

  
 
  

  const getUser = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/apit/TView`);
      if (response.data && response.data.data && response.data.data.length > 0) {
        const firstElement = response.data.data[0]; 
        
        sessionStorage.setItem("user", JSON.stringify(firstElement));
      } else {
        console.error("No data found in the response or the array is empty");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  
  
  const getPdf = async () => {
    try {
      // Retrieve user data from session storage
      const storedUser = sessionStorage.getItem("user");
      if(!storedUser){
        getUser();
      }
  
      if (storedUser) {
        const user = JSON.parse(storedUser); // Parse the user data
        // Fetch PDF data using the user information
        const result = await axios.get(`http://localhost:3001/apip/w-view?user=${user}`);
        setAllPdf(result.data.data); 
        setFilteredPdf(result.data.data); 
      } else {
        console.error("No user data found in session storage.");
      }
    } catch (error) {
      console.error("Error fetching PDF data:", error);
    }
  };
  
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

  const handleShowPdf = (pdf) => {
    const pdfId = pdf; 
    navigate('/pdf', { state: { pdfId } });
  };
  const handleEdit = (pdf) => {
    const pdfId = pdf;
    navigate('/editPdf', { state: { pdfId } }); 
  };

  const handlepro = () => {
    navigate( '/profile' ,  { state: { isTeacher: true } });
  };
  
  return (
    <div className="Lan-container">
            <img className='lph' src="https://static.vecteezy.com/system/resources/previews/004/495/548/original/light-soft-color-blue-low-poly-crystal-background-polygon-design-pattern-low-poly-illustration-low-polygon-background-free-vector.jpg" alt="" />
      <nav className="Lan-navbar">
        <div className='d1'>
      <button className='menu-btn' onClick={
        () => showMenu()
      }>
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#f0ffff"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
      </button>
      <div className="filter">
          <button className="filter-btn">
            {/* SVG icon or "Filter" text */}
            <svg width="35" height="27" viewBox="0 0 35 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap='round' d="M27.0927 20.2658L32.7591 11.2464L34.1421 13.5623L26.0472 26.4471L18.1425 13.4447L19.5594 11.1494L25.0927 20.2511L25.2374 0.552582L27.2374 0.567274L27.0927 20.2658Z" fill="white"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M28 4H0V1H28V4Z" strokeLinecap='round' fill="white"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M24 11H4V8H24V11Z" strokeLinecap='round' fill="white"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M21 18H7V15H21V18Z" strokeLinecap='round' fill="white"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M17 25H11V22H17V25Z" strokeLinecap='round' fill="white"/>
                </svg>
          </button>
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
        </div>
          <ul className="Lan-nav-links">
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
      {menuToggle && (
        <ul className="menuList">
          <li> <Link to={"/uni"}><button className="sNavbutton">University</button></Link></li>
          <li> <Link to={'/cor'}><button className="sNavbutton">Courses</button></Link></li>
          <li><Link
                to={`/upload?user=${sessionStorage.getItem("user")}`}
              >
                <button className="sNavbutton">Add</button>
              </Link>
          </li>
        </ul>
      )}
          <div className="div2">
          {filteredPdf &&
            filteredPdf.map((data) => (
            <div key={data.pdf} className="card">
              <h2 className='card-title'>{data.title}</h2>
              <p className='card-description'>Author: {data.author}</p>
              <p className='card-description'>University: {data.university}</p>
              <p className='card-description'>Course: {data.course}</p>
              <div className="cbuttons"><button className='card-button' onClick={() => handleShowPdf(data._id)}>Show PDF</button>
              <button className='card-button' onClick={()=>handleEdit(data._id)}>Edit PDF</button></div>
            </div>
          ))}
          </div>
        </div>
    </div>
  );
}

export default LandingPage;