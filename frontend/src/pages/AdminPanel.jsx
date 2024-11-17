// AdminPanel.jsx
import React, { useState } from 'react';
import './AdminPanel.css';
import Dashboard from './Dashboard';
import User from './User';
import Settings from './Settings';

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
          <li><a href="#" onClick={()=>handleTable(3)}>Settings</a></li>
        </ul>
      </nav>
      <main className="admin-main">
        <span>
          {
            index === 'dashboard' ? <Dashboard /> : index === 'user' ? <User /> : index === "settings" ? <Settings /> : " "
          }
        </span>
      </main>
    </div>
  );
};

export default AdminPanel;