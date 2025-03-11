// AdminPanel.jsx
import React, { useState } from 'react';
import './AdminPanel.css';
import Dashboard from './Dashboard';
import User from './User';
import University from './University';
import Course from './Course';
import Teachers from './Teachers';
import AddUniversity from './AddUniversity';
import AddCourse from './AddCourse';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const [index,setIndex] = useState("");
  const navigate =useNavigate()

  const handleTable=(i)=>{
    if(i==1){
      setIndex('dashboard')
    }
    if(i==2){
      setIndex('user')
    }
    if(i==3){
      setIndex('university')
    }
    if(i==4){
      setIndex('teachers')
    }
    if(i==5){
      setIndex('course')
    }
    if(i==6){
      setIndex('add-unni')
    }
    if(i==7){
      setIndex('add-cors')
    }
    if(i==8){
      const userConfirmed = window.confirm("Do you want to proceed?");
    
    if (userConfirmed) {
      axios.delete("http://localhost:3001/apiu/logout");
      alert("Logged Out");
      navigate('/', { replace: true });
    } else {
      navigate('/admin', { replace: true })

    }
    }
  }
  
  return (
    <>
    <div className="header">
    <h1 className="admin-header">ADMIN PANNEL</h1>
    </div>
    <div className="admin-panel">

      <nav className="admin-nav">
        <ul>
          <li><a href="#" onClick={()=>handleTable(1)}>Dashboard</a></li>
          <li><a href="#" onClick={()=>handleTable(2)}>Users</a></li>
          <li><a href="#" onClick={()=>handleTable(3)}>University</a></li>
          <li><a href="#" onClick={()=>handleTable(4)}>Teachers</a></li>
          <li><a href="#" onClick={()=>handleTable(5)}>Course</a></li>
          <li><a href="#" onClick={()=>handleTable(6)}>AddUniversity</a></li>
          <li><a href="#" onClick={()=>handleTable(7)}>AddCourse</a></li>
          <li><a href="#" onClick={()=>handleTable(8)}>Logout</a></li>
        </ul>
      </nav>
      <main className="admin-main">
        <span>
          {
            index === 'dashboard' ? <Dashboard /> : index === 'user' ? <User /> : index==='university' ? <University/> : index==='teachers' ? <Teachers/> : index==='course' ? <Course/>  : index==='add-unni' ? <AddUniversity/>  : index==='add-cors' ? <AddCourse/>  : " "
          }
        </span>
      </main>
    </div>
    </>
  );
};

export default AdminPanel;