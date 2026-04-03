import React, { useState } from 'react'

import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function SignIn() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
    
  async function handleSubmit(e) {
    e.preventDefault();

    try{
        const res = await axios.post('https://fullstack-chat-app-backend.up.railway.app/api/auth/signin', 
          {email, password}, {
          withCredentials: true
        });

        console.log(res.data);

        navigate('/');
    }
    catch(err){
        console.log(err);
        setMessage(err.response?.data?.message || "Signin failed");
    }
  }

  return (
    <div className="signin sign">
        <form action="POST" className="signin_form" onSubmit={handleSubmit}>
            <h1 style={{textAlign: "center"}}>Sign In</h1>
            
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

            <p className='bottomtext'>don't have an account? <Link to='/signup'><span style={{color: 'crimson'}}>Sign Up</span></Link></p>
            <p className="error" style={{color: "crimson"}}>{message && message}</p>
        </form>
    </div>
  )
}

export default SignIn;