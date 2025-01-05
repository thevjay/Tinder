import React, { useState } from 'react'
import  axios  from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../utils/constants';

const Login = () => {

  const [emailId,setEmailId] = useState("abc@gmail.com");
  const [password,setPassword] = useState("12345");
  const dispatch = useDispatch();
  const navigate = useNavigate()
  
  const handleLogin = async() =>{
    try{

    const res = await axios.post( BASE_URL + "/login" , {
        emailId,
        password,
        },
          { withCredentials: true}
      )

      console.log(res.data.user)
      dispatch(addUser(res.data.user));
      navigate('/')
    }catch(error){
      console.error(error)
    }
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
            <button onClick={handleLogin} className="btn btn-primary">Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login



//32