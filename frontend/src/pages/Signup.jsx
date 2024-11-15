import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Sign.css';


const Signup = ({isOpen, onClose}) => {
   
  const [uname, setUname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [error,setError]=useState(null);
  const navigate =useNavigate();


 const handleSubmit=async(event)=>{
  event.preventDefault();
  try {
    const res= await axios.post("http://localhost:3001/apiu/reg",{
      uname,
      email,
      password,
      age
    });

    if(uname===''||email===''||password===''||age===''){
      alert("You missed value");
    }
    else if(res.status ===200){
      alert("registered successfully");
      navigate('/');
    }
    else{
      setError(res.data)
    }
  } catch (error) {
    setError(error.message);
  }
 }
 if(!isOpen) return null;
  return (
    <div className='modal-overlay'>
      <div  className="modal-content">
      <button className="close-button" onClick={onClose}>X</button>
  <h1>SignUp</h1>
  <br /><br />
  <input type="text" className='inputs-style' onChange={(e) => setUname(e.target.value)} placeholder="Username"  />
  <br /><br />
  <input type="email" className='inputs-style' onChange={(e) => setEmail(e.target.value)}  placeholder="Email" />
  <br /><br />
  <input type="password" className='inputs-style' onChange={(e) => setPassword(e.target.value)}  placeholder="Password" />
  <br /><br />
  <input type="text" className='inputs-style' onChange={(e) => setAge(e.target.value)}  placeholder="Age" />
  <br /><br />
  <button type="submit" className='sign-btn' onClick={handleSubmit} >Sign Up</button>
</div>
    </div>
  )
}

export default Signup
