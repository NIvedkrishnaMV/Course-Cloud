// AdminPanel.jsx
import React, { useState } from 'react';
import './AdminPanel.css';
import Dashboard from './Dashboard';
import User from './User';
import Settings from './Settings';
import University from './University';
import Course from './Course';
import Teachers from './Teachers';

const AdminPanel = () => {
  const [index,setIndex] = useState("");

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
      setIndex('settings')
    }
  }
  
  return (
    <div className="admin-panel">
      <header className="admin-header">
        <h1>Admin Panel</h1>
      </header>
      <nav className="admin-nav">
        <ul>
          <li><a href="#" onClick={()=>handleTable(1)}>Dashboard</a></li>
          <li><a href="#" onClick={()=>handleTable(2)}>Users</a></li>
          <li><a href="#" onClick={()=>handleTable(3)}>University</a></li>
          <li><a href="#" onClick={()=>handleTable(4)}>Teachers</a></li>
          <li><a href="#" onClick={()=>handleTable(5)}>Course</a></li>
          <li><a href="#" onClick={()=>handleTable(6)}>Settings</a></li>
        </ul>
      </nav>
      <main className="admin-main">
        <span>
          {
            index === 'dashboard' ? <Dashboard /> : index === 'user' ? <User /> : index==='university' ? <University/> : index==='teachers' ? <Teachers/> : index==='course' ? <Course/> : index === "settings" ? <Settings /> : " "
          }
        </span>
      </main>
    </div>
  );
};

export default AdminPanel;