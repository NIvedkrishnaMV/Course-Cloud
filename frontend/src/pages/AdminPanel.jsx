// AdminPanel.jsx
import React from 'react';
import './AdminPanel.css';

const AdminPanel = () => {
  return (
    <div className="admin-panel">
      <header className="admin-header">
        <h1>Admin Panel</h1>
      </header>
      <nav className="admin-nav">
        <ul>
          <li><a href="#">Dashboard</a></li>
          <li><a href="#">Users</a></li>
          <li><a href="#">Settings</a></li>
        </ul>
      </nav>
      <main className="admin-main">
        {/* Content will be rendered here */}
      </main>
    </div>
  );
};

export default AdminPanel;