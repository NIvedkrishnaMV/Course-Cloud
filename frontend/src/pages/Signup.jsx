import React from 'react'

const Signup = () => {
  return (
    <div>
      <div className='signdiv'>
  <h3 className='signh3'>SignUp</h3>
  <br /><br />
  <input type="text" placeholder="Username" className='signuser' />
  <br /><br />
  <input type="password" className='signpass' placeholder="Password" />
  <br /><br />
  <button type="submit" className='signbut'>Sign Up</button>
</div>
    </div>
  )
}

export default Signup
