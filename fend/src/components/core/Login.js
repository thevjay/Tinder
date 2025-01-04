import React, { useState } from 'react'
import  axios  from 'axios';

const Login = () => {

  const [emailId,setEmailId] = useState("");
  const [password,setPassword] = useState("");
  
  const handleLogin = async() =>{

    axios.post()
  }

  return (
    <div className='flex justify-center my-10'>
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Login</h2>
          <div className=''>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Email Id</span>
              </div>
              <input 
                type="text"
                value={emailId} 
                placeholder="Enter EmailId" 
                className="input input-bordered w-full max-w-xs"
                onChange={(e)=> setEmailId(e.target.value)} 
              />
            </label>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input 
                type="password" 
                value={password}
                placeholder="Enter Password" 
                className="input input-bordered w-full max-w-xs"
                onChange={(e)=> setPassword(e.target.value)} 
              />
            </label>
          </div>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
