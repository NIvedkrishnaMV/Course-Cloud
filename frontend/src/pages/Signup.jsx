import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Sign.css';


const Signup = () => {
   
  const [uname, setUname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const navigate =useNavigate();

  const handleGenderChange = (event) => {
      setGender(event.target.value);
    };

 const handleSubmit=async(event)=>{
  event.preventDefault();
  try {
    const res= await axios.post("http://localhost:3001/apiu/reg",{
      uname,
      email,
      password,
      age,
      gender,
      phone
    });

 

    if(uname===''||email===''||password===''||age===''||gender===''||phone===''){
      alert("You missed value");
    }
    else if(res.status ===200){
      alert("registered successfully");
      navigate('/');
    }
    else{
      alert('Login Failed')
    }
  } catch (error) {
    alert('Login Error');
  }
 }
  return (
    <div className='modal-overlay'>
      <div  className="modal-content">
      <button className="close-button">X</button>
  <h1>SignUp</h1>
  <br /><br />
  <input type="text" className='inputs-style' onChange={(e) => setUname(e.target.value)} placeholder="Username"  />
  <br /><br />
  <input type="email" className='inputs-style' onChange={(e) => setEmail(e.target.value)}  placeholder="Email" />
  <br /><br />
  <input type="password" className='inputs-style' onChange={(e) => setPassword(e.target.value)}  placeholder="Password" />
  <br /><br />
  <div className="gend-style">
  <label>
    Gender:
        <input 
          
          type="radio" 
          name="gender" 
          value="male" 
          checked={gender === 'male'} 
          onChange={handleGenderChange} 
        />
        Male
      </label>&nbsp;&nbsp;
      <label>
        <input 
          type="radio" 
          name="gender" 
          value="female" 
          checked={gender === 'female'} 
          onChange={handleGenderChange} 
        />
        Female
      </label>
      </div>
  <br /><br />
  <input type="text" className='inputs-style' onChange={(e) => setAge(e.target.value)}  placeholder="Age" />
  <br /><br />
  <input type="text" className='inputs-style' onChange={(e) => setPhone(e.target.value)}  placeholder="Phone Number" />
  <br /><br />
  
  <button type="submit" className='sign-btn' onClick={handleSubmit} >Sign Up</button>
</div>
    </div>
  )
}

export default Signup
