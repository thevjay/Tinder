import React, { useEffect } from 'react'
import NavBar from '../common/NavBar';
import { Outlet, useNavigate } from 'react-router-dom';
import Footer from '../common/Footer';
import axios from 'axios';
import { BASE_URL } from '../../utils/constants'
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../utils/userSlice'

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const  userData = useSelector((store)=>store.user)

  const fetchUser = async() => {  
    if(userData) return;
    try{
      const res = await axios.get( BASE_URL + "/profile/view",{
        withCredentials:true,
        headers: {
          'Content-Type': 'application/json',
      },
      })

      console.log(res.data)
      dispatch(addUser(res.data))
    }
    catch(error){
      if(error.status === 401){
        navigate('/login')
      }
      console.error(error)
    }
  };

  useEffect(()=>{
        fetchUser()
    },[])

  return (
    <div className='flex flex-col justify-between'>
      <NavBar />
      <Outlet />
      <Footer />
      {/* <h1 className='text-3xl font-bold'>Body</h1> */}
    </div>
  )
}

export default Body;
