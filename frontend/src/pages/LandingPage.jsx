import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './landingPage.css';
import './Card.css'
import { Link, useNavigate } from 'react-router-dom';


function LandingPage() {
  const [allPdf, setAllPdf] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [menuToggle,setMenuToggle]=useState(false);
 





  const navigate = useNavigate();

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
        setAllPdf(result.data.data); // Update state with the fetched PDF data
      } else {
        console.error("No user data found in session storage.");
      }
    } catch (error) {
      console.error("Error fetching PDF data:", error);
    }
  };
  

  const handleShowPdf = (pdf) => {
    const pdfId = pdf; 
    navigate('/pdf', { state: { pdfId } });
  };
  const handleEdit = (pdf) => {
    const pdfId = pdf;
    navigate('/editPdf', { state: { pdfId } }); 
  };
  
  return (
    <div className="Lan-container">
            <img className='lph' src="https://static.vecteezy.com/system/resources/previews/004/495/548/original/light-soft-color-blue-low-poly-crystal-background-polygon-design-pattern-low-poly-illustration-low-polygon-background-free-vector.jpg" alt="" />
      <nav className="Lan-navbar">
      <button className='menu-btn' onClick={
        () => showMenu()
      }>
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#f0ffff"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
      </button>
          <ul className="Lan-nav-links">
            <li><button className='Lan-homebtn'>Home</button></li>
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
          {allPdf && allPdf.map(data => (
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