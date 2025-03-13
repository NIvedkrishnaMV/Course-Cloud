import axios from 'axios';
import React, { useEffect, useState } from 'react'

const University = () => {
  const [universities, setUniversities] = useState([]);

  useEffect(() => {
    getUniversity();
  }, []);

  const getUniversity=async()=>{
    const result = await axios.get("http://localhost:3001/apit/uni-view");
    console.log(result.data.data)
    setUniversities(result.data.data);
  }
  return (
    <div>
      <h1>University</h1>
      <table className='dash-table'>
              <thead className='dash-table-head'>
                <tr>
                  <th>University name</th>
                  <th>place</th>
                </tr>
              </thead>
              <tbody className='dash-table-body'>
              {universities.map((uni, index) => (
                <tr key={index}>
                  <td>{uni.universityName}</td>
                  <td>{uni.place}</td>
                </tr>
              ))}
              </tbody>
            </table>
    </div>
  )
}

export default University
