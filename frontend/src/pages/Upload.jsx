import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Upload.css'; 
const Upload = () => {
  const [file, setFile] = useState(null);
  const [title,setTitle] = useState("");
  const [author,setAuthor] = useState('');
  const [university,setUniversity] = useState("");
  const [course, setCourse] = useState("");
  const [sem, setSem] = useState("");
  const [universityOptions , setUniversityOptions] = useState([]);
  const [courseOptions , setCourseOptions] = useState([]);

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const navigate=useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const user = queryParams.get('user');

  useEffect(() => {
    if (user && user.trim() !== "") {
      const cleanUser = user.replace(/^"|"$/g, ''); 
      setAuthor(cleanUser); 
    } else {
      console.error('Invalid user value: Empty or undefined.');
    }
  }, [])

  useEffect(() => {
    const fetchUniversities = async () => {
        try {
            const result = await axios.get("http://localhost:3001/apit/uni-view");
            console.log("Fetched universities:", result.data.data);
            setUniversityOptions(result.data.data || []); // Use a default empty array if no data
        } catch (error) {
            console.error("Error fetching universities:", error);
        }
    };
    const fetchCourses = async () => {
      try {
          const result = await axios.get("http://localhost:3001/apit/cors-view");
          setCourseOptions(result.data.data || []); // Use a default empty array if no data
      } catch (error) {
          console.error("Error fetching Courses:", error);
      }
    };

  fetchCourses();
  fetchUniversities();
}, []);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setFile(file);
    setUploadedFiles((prevFiles) => [...prevFiles, file]);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    setUploadedFiles((prevFiles) => [...prevFiles, file]);
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("title",title);
    formData.append("file",file);
    formData.append("author",author);
    formData.append("university",university);
    formData.append("course",course);
    formData.append("sem",sem);
    const result=await axios.post("http://localhost:3001/apip/upload-files",formData,{
      headers:{"Content-Type":"multipart/form-data"},
    })
    console.log(result.data);
      if (result.data.status=="ok") {
        alert("Uploaded PDF");
        navigate('/landing', { replace: true });
      }
  };


  return (
    <div className="upload-container">
      <div className="upload-navbar">
        <nav className="upload-navbar">
          <ul className="Lan-nav-links">
            <li>
              <Link to={'/landing'}>
                <button className='back-button'>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.825 13L13.425 18.6L12 20L4 12L12 4L13.425 5.4L7.825 11H20V13H7.825Z" fill="#fff"/>
                  </svg>&nbsp;
                  Home
                </button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="upload-content">
        <div className="upload-details">
          <h1 className='heading'>File Details</h1>
          {/* <label htmlFor="author">Author:</label>
          <input type="text" placeholder='File name' id='author' onChange={(e) => setAuthor(e.target.value)} /> */}
          <label htmlFor="title">Title:</label>
          <input type="text" className='upload-text' placeholder='File name' id='title' onChange={(e) => setTitle(e.target.value)} />
          <label htmlFor="university">University:</label>
          <select id="university" onChange={(e) => setUniversity(e.target.value)}>
            <option value="">Select your University</option>
            {universityOptions && universityOptions.map((uni) => (
              <option key={uni._id} value={uni.universityName}>{uni.universityName}</option>
            ))}
          </select>
          <label htmlFor="course">Course name:</label>
          <select id="course" onChange={(e) => setCourse(e.target.value)}>
            <option value="">Select your Course</option>
            {courseOptions && courseOptions.map((uni) => (
              <option key={uni._id} value={uni.courseName}>{uni.courseName}</option>
            ))}
          </select>

          <label htmlFor="semester">Semester:</label>
          <select id="semester" onChange={(e) => setSem(parseInt(e.target.value))}>
              <option value="">Select your semester</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
            </select>


        </div>
        <div className="upload-form">
          <h1 className='heading'>Upload Your File</h1>
          <div className="drop-zone" onDragOver={handleDragOver} onDrop={handleDrop}>
            <p>Drag and drop a file here or click to browse.</p>
            <input type="file" className='upload-file' id="browse" onChange={handleFileChange} accept=".pdf, .docx, .pptx, .txt, .xlsx" multiple />
            <button id="uploadButton" onClick={handleSubmit}>Upload File</button>
          </div>
          {uploadedFiles.length > 0 && (
            <div className="file-list">
              <ul>
                {uploadedFiles.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>

  );
};

export default Upload;