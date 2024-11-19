import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Teachers = () => {
    const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    getTeacher();
  }, []);

  const getTeacher=async()=>{
    const result = await axios.get("http://localhost:3001/apit/view");
    console.log(result.data.data)
    setTeacher(result.data.data);
  }
  return (
    <div>
        <h1>Teachers</h1>
        <table className='dash-table'>
        <thead className='dash-table-head'>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Age</th>
            <th>University</th>
            <th>Course</th>
          </tr>
        </thead>
        <tbody className='dash-table-body'>
        {teacher == null? "" :  teacher.map(data => (
            <tr key={data._id}>
              <td>{data._id}</td>
              <td>{data.tname}</td>
              <td>{data.email}</td>
              <td>{data.age}</td>
              <td>{data.university}</td>
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
            </tr>
           ))} 
        </tbody>
      </table>

    </div>
  )
}

export default Teachers