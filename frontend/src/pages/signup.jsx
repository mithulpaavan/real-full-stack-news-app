import React, { useState } from 'react'

import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function SignUp() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
    
  async function handleSubmit(e) {
    e.preventDefault();

    try{
        const res = await axios.post('https://fullstack-chat-app-backend.up.railway.app/api/auth/signup', 
          {username, email, password}, {
          withCredentials: true
        });

        console.log(res.data);

        navigate('/');
    }
    catch(err){
        console.log(err);
        setMessage(err.response?.data?.message || "Signup failed");
    }
  }

  return (
    <div className="signup sign">
      <form action="POST" className="signup_form" onSubmit={handleSubmit}>
            <h1 style={{textAlign: "center"}} className='signup-title'>Sign Up</h1>        
            <input 
            type="text" 
            className="username"
            placeholder='username...' 
            onChange={(e)=>setUsername(e.target.value)}
            />

            <input 
            type="email" 
            className="email" 
            placeholder='email...'
            onChange={(e)=>setEmail(e.target.value)}
            />

            <input 
            type="password" 
            className='password'
            placeholder='password'
            onChange={(e)=>setPassword(e.target.value)}
            />

            <button className="btn btn-submit" type='submit'>submit</button>

            <p className='bottomtext'>Aldready have an account? <Link to='/signin'><span style={{color: 'crimson'}}>Sign In</span></Link></p>
            <p className="error" style={{color: "crimson"}}>{message && message}</p>
        </form>
    </div>
  )
}

export default SignUp;