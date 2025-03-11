import React, { useEffect, useState } from 'react';
import './AdminPanel.css';
import axios from 'axios';
import  {Link, useNavigate} from 'react-router-dom';


const Dashboard = () => {
  const [pdf, setPdf] = useState(null);
  const navigate =useNavigate()

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/apip/del/${id}`);
      console.log("deleted");
      getPdf();
    } catch (error) {
      console.error("Error deleting the item:", error);
    }
  }

  const handleShowPdf = (pdf) => {
    const pdfId = pdf; 
    navigate('/pdf', { state: { pdfId } });
  };

  useEffect(() => {
    getPdf();
  }, []);

  const getPdf=async()=>{
    const result = await axios.get("http://localhost:3001/apip/view");
    setPdf(result.data.data);
  }

  return (
    <div>
      <h1>DASHBOARD</h1>
      <table className='dash-table'>
        <thead className='dash-table-head'>
          <tr>
            <th>Title</th>
            <th>File Name</th>
            <th>Author</th>
            <th>ViewFile</th>
            <th>University</th>
            <th>Semester</th>
            <th>Course</th>
            {/* <th>
            </th> */}
          </tr>
        </thead>
        <tbody className='dash-table-body'>
        {pdf == null? "" :  pdf.map(data => (
            <tr key={data._id}>
              <td>{data.title}</td>
              <td>{data.pdf}</td>
              <td>{data.author}</td>
              <td>
                <button className='viewButton' onClick={() => handleShowPdf(data._id)}>
                  <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 24C2 24 10 8 24 8C38 8 46 24 46 24C46 24 38 40 24 40C10 40 2 24 2 24Z" stroke="#1E1E1E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M24 30C27.3137 30 30 27.3137 30 24C30 20.6863 27.3137 18 24 18C20.6863 18 18 20.6863 18 24C18 27.3137 20.6863 30 24 30Z" stroke="#1E1E1E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </td>
              <td>{data.university}</td>
              <td>{data.sem}</td>
              <td>{data.course}</td>
              <td>
                <Link>
                  <button onClick={(e)=>handleDelete(data._id)}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6H4V4H9V3H15V4H20V6H19V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM17 6H7V19H17V6ZM9 17H11V8H9V17ZM13 17H15V8H13V17Z" fill="#1D1B20"/>
                    </svg>
                  </button>
                </Link>
            </td>
            </tr>
             ))} 
        </tbody>
      </table>
    </div>
  )
}

export default Dashboard