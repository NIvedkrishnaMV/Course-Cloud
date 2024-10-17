import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Upload.css'; 
const Upload = () => {
  const [file, setFile] = useState(null);
  const [title,setTitle] = useState("");
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
  );
};

export default Upload;