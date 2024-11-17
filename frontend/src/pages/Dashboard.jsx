import React, { useEffect, useState } from 'react';
import './AdminPanel.css';
import axios from 'axios';
import  {Link} from 'react-router-dom';


const Dashboard = () => {
  const [pdf, setPdf] = useState(null);

  useEffect(() => {
    getPdf();
  }, []);

  const getPdf=async()=>{
    const result = await axios.get("http://localhost:3001/apip/view");
    console.log(result.data.data)
    setPdf(result.data.data);
  }

  return (
    <div>
      <h1>DASHBOARD</h1>
      <table className='dash-table'>
        <thead className='dash-table-head'>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>File Name</th>
            <th>Author</th>
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
              <td>{data._id}</td>
              <td>{data.title}</td>
              <td>{data.pdf}</td>
              <td>{data.author}</td>
              <td>{data.university}</td>
              <td>{data.sem}</td>
              <td>{data.course}</td>
              <td>
                <Link>
                  <button>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6H4V4H9V3H15V4H20V6H19V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM17 6H7V19H17V6ZM9 17H11V8H9V17ZM13 17H15V8H13V17Z" fill="#1D1B20"/>
                    </svg>
                  </button>
                </Link>
            </td>
            <td>
              <Link>
                <button>
                  <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 8H8C6.93913 8 5.92172 8.42142 5.17157 9.17157C4.42143 9.92171 4 10.9391 4 12V40C4 41.0609 4.42143 42.0783 5.17157 42.8284C5.92172 43.5786 6.93913 44 8 44H36C37.0609 44 38.0783 43.5786 38.8284 42.8284C39.5786 42.0783 40 41.0609 40 40V26M37 5C37.7956 4.20435 38.8748 3.75735 40 3.75735C41.1252 3.75735 42.2044 4.20435 43 5C43.7956 5.79564 44.2426 6.87478 44.2426 8C44.2426 9.12521 43.7956 10.2043 43 11L24 30L16 32L18 24L37 5Z" stroke="#1E1E1E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
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