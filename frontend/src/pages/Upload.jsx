import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Upload.css'; 
const Upload = () => {
  const [file, setFile] = useState(null);
  const [title,setTitle] = useState("");
  const [author,setAuthor] = useState("");
  const [university,setUniversity] = useState("");
  const [course, setCourse] = useState("");
  const [sem, setSem] = useState("");

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const navigate=useNavigate();

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
    const result=await axios.post("http://localhost:3001/apip/upload-files",formData,{
      headers:{"Content-Type":"multipart/form-data"},
    })
    console.log(result.data);
      if (result.data.status=="ok") {
        alert("Uploaded PDF");
        navigate('/landing');
      }
  };


  return (
    <div className="upload-container">
      <div className="upload-navbar">
      <nav className="upload-navbar">
          
        
          {/* buttons */}
          <ul className="Lan-nav-links">
            <li>
              <Link to={'/landing'}>
                <button className='back-button'>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.825 13L13.425 18.6L12 20L4 12L12 4L13.425 5.4L7.825 11H20V13H7.825Z" fill="#1D1B20"/>
                  </svg>&nbsp;
                  Home
                </button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="upload-content">
      <div className="upload-form">
      <h1 className='heading'>Upload Your PDF File</h1>
      <input type="text" placeholder='File name' id='title' onChange={(e)=>setTitle(e.target.value)} /><br /><br />
      <div
        className="drop-zone"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <p>Drag and drop a file here or click to browse.</p>
        <input
          type="file"
          id="browse"
          onChange={handleFileChange}
          accept=".pdf, .docx, .pptx, .txt, .xlsx"
          multiple
        /><br/><br />
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
      <div className="upload-details">
        <h1 className='heading'>File Details</h1>
        <input type="text" placeholder='Author Name' id='title' onChange={(e)=>setAuthor(e.target.value)} /><br /><br />
        <input type="text" placeholder='Course Name' id='title' onChange={(e)=>setCourse(e.target.value)} /><br /><br />
        <input type="text" placeholder='University' id='title' onChange={(e)=>setUniversity(e.target.value)} /><br /><br />
        <input type="text" placeholder='Semester' id='title' onChange={(e)=>setSem(e.target.value)} /><br /><br />
      </div>
      </div>
    </div>
  );
};

export default Upload;