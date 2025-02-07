import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Course = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses=async()=>{
    const result = await axios.get("http://localhost:3001/apit/cors-view");
    console.log(result.data.data)
    setCourses(result.data.data);
  }
  return (
    <div>
      <h1>Courses</h1>
      <table className='dash-table'>
              <thead className='dash-table-head'>
                <tr>
                  <th>Course name</th>
                  <th>years</th>
                </tr>
              </thead>
              <tbody className='dash-table-body'>
              {courses.map((course, index) => (
                <tr key={index}>
                  <td>{course.courseName}</td>
                  <td>{course.years}</td>
                </tr>
              ))}
              </tbody>
            </table>
    </div>
  )
}

export default Course
