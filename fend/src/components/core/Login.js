import React, { useState } from 'react'
import  axios  from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../../utils/userSlice';
import { Link,useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'
import { Base_URL } from '../../utils/constants';


const Login = () => {

  const [emailId,setEmailId] = useState("abc@gmail.com");
  const [password,setPassword] = useState("Abc!@123");
  const [firstName , setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error,setError] = useState('')

  const dispatch = useDispatch();
  const navigate = useNavigate()

    const handleLogin = async() =>{
      try{
        const res = await axios.post( Base_URL + "/login" , 
          { emailId,password },
          { withCredentials: true}
        )

        //console.log(res.data.user)
        dispatch(addUser(res.data.user));
        navigate('/')
      }catch(error){
        setError(error?.response?.data)
        //console.log(error.response.data)
        console.error(error)
        return toast.error(
          error?.response?.data || 'Login failed, please try again.'
        )
      }
    }

  const handleSignup = async() => {
    try{
      const res = await  axios.post(Base_URL + "/signup",
        { firstName, lastName, emailId, password},
        { withCredentials: true }
      )

      dispatch(addUser(res.data.data))
      return navigate("/profile")
    }catch(error){
      setError(error?.response?.data)
      console.error(error)
      return toast.error(
        error?.response?.data || 'Sign Up failed, please try again.'
    );
    }
  }

  return (
    <div className='flex justify-center my-10'>
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{ isLoginForm ? "Login" : "SigUp" }</h2>
          <div className=''>
          { !isLoginForm && (
            <>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">First Name</span>
              </div>
              <input 
                type="text"
                value={firstName} 
                placeholder="Enter FirstName" 
                className="input input-bordered w-full max-w-xs"
                onChange={(e)=> setFirstName(e.target.value)} 
              />
          </label>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Last Name</span>
              </div>
              <input 
                type="text"
                value={lastName} 
                placeholder="Enter LastName" 
                className="input input-bordered w-full max-w-xs"
                onChange={(e)=> setLastName(e.target.value)} 
              />
            </label>
            </>
            )}
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
                className="input input-bordered w-full max-w-xs pr-10"
                onChange={(e)=> setPassword(e.target.value)} 
              />
              { isLoginForm ?
                <div className="text-end">
                  <Link to={``} className='label-text'>Forgot Password</Link>
                </div> : null}

            </label>
          </div>
          <p className='text-red-600'>{error}</p>
          <div className="card-actions justify-center text-center mt-2">
            <button 
              onClick={ isLoginForm ? handleLogin : handleSignup } 
              className="btn btn-primary"
            >
              { isLoginForm ? "Login" : "Sig Up" }
            </button>
          </div>

          <p 
            className='m-auto py-2 hover:text-primary '
            onClick={() => setIsLoginForm((value)=> !value)}
          >
            { isLoginForm ? "New User? SignUp Here" : "Existing User? Login Here"}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login

