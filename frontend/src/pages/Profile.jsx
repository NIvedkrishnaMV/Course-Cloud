import React, { useEffect } from 'react';
import "./profile.css";
import axios from 'axios';
import LandingPage from './LandingPage';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [profiles, setProfiles] = React.useState([]); 

  const goHome=()=>{
    navigate(-1, { replace: true })
  }


  useEffect(() => {
    axios.get("http://localhost:3001/apiu/proView")
      .then(response => {
        setProfiles(response.data.data); 
      })
      .catch(error => {
        console.error("There was an error making the request:", error);
      });
  }, []);

  const handleLogOut = async () => {
    try {
      const userConfirmed = window.confirm("Do you want to proceed?");
    
      if (userConfirmed) {
        axios.delete("http://localhost:3001/apiu/logout");
        alert("Logged Out");
        navigate('/',{ replace: true });
      } else {
        navigate('/landing',{ replace: true }) 
      } 
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Failed to log out. Please try again.");
    }
  };


  return (
    <>
    <nav className="Lan-navbar">
      <button disabled style={{backgroundColor: 'inherit',border:"none",flexGrow:1}}></button>
          <ul className="Lan-nav-links">

            <li><button className='Lan-homebtn' onClick={()=>goHome()}>Home</button></li>
            {/* logout button */}
            <li><button className='profileBtn' onClick={()=>handleLogOut()}>
            <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="34px" fill="#fff"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>
              </button></li>
          </ul>
        </nav><br /><br />
    <div className="profile-container">
      
      <header className="profile-header">
        <h1>PROFILE</h1> 
      </header>
      <div className="profile-content">
        {profiles.map((profile) => (
          <div className="profile-info" key={profile._id}>
            
            <div className="avatar">
              <svg width="100" height="100" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="40" height="40" rx="20" fill="#EADDFF"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M26.0002 16C26.0002 19.3137 23.314 22 20.0002 22C16.6865 22 14.0002 19.3137 14.0002 16C14.0002 12.6863 16.6865 10 20.0002 10C23.314 10 26.0002 12.6863 26.0002 16ZM24.0002 16C24.0002 18.2091 22.2094 20 20.0002 20C17.7911 20 16.0002 18.2091 16.0002 16C16.0002 13.7909 17.7911 12 20.0002 12C22.2094 12 24.0002 13.7909 24.0002 16Z" fill="#4F378A"/>
                <path d="M20.0002 25C13.5259 25 8.00952 28.8284 5.9082 34.192C6.4201 34.7004 6.95934 35.1812 7.52353 35.6321C9.08827 30.7077 13.997 27 20.0002 27C26.0035 27 30.9122 30.7077 32.477 35.6321C33.0412 35.1812 33.5804 34.7004 34.0923 34.1921C31.991 28.8284 26.4746 25 20.0002 25Z" fill="#4F378A"/>
              </svg>
            </div>
            <h2>Name: {profile.uname}</h2> 
            <h3>Contact Information: {profile.phone}</h3>
            <h3>Age: {profile.age}</h3>
            <h3>Gender: {profile.gender}</h3>
            <p>Email: {profile.email}</p> 
          </div>
        ))}
      </div>
      
    </div>
    </>
  );
}

export default Profile;