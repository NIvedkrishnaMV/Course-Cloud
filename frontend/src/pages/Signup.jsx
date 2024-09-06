import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Signup = () => {
   
  const [uname, setUname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [error,setError]=useState(null);
  const navigate =useNavigate();


 const handleSubmit=async(event)=>{
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
      navigate('/login');
    }
    else{
      setError(res.data)
    }
  } catch (error) {
    setError(error.message);
  }
 }

  return (
    <div>
      <div className='signdiv'>
  <h3 className='signh3'>SignUp</h3>
  <br /><br />
  <input type="text" onChange={(e) => setUname(e.target.value)} placeholder="Username" className='signuser' />
  <br /><br />
  <input type="email" onChange={(e) => setEmail(e.target.value)} className='signpass' placeholder="Email" />
  <br /><br />
  <input type="password" onChange={(e) => setPassword(e.target.value)} className='signpass' placeholder="Password" />
  <br /><br />
  <input type="text" onChange={(e) => setAge(e.target.value)} className='signpass' placeholder="Age" />
  <br /><br />
  <button type="submit" onClick={handleSubmit} className='signbut'>Sign Up</button>
</div>
    </div>
  )
}

export default Signup
