import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../../utils/feedSlice'
import UserCard from './UserCard'
import Skeleton from '../common/Skeleton'
import { Link } from 'react-router-dom'
import { Base_URL } from '../../utils/constants'

const Feed = () => {

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed)


  const getFeed = async() => {
    
    try{
      const res = await axios.get(Base_URL+'/feed',{
        withCredentials:true
      })

      dispatch(addFeed(res.data))
    }catch(error){
      console.error(error)
    }
  }

  useEffect(() => {
    setTimeout(()=>{
      getFeed()
      setLoading(false)
    },2000)
  },[])

  if(!feed) return(
    <div className='h-screen flex justify-center items-center mt-42'>
      <div className='my-14 flex justify-center'>
        <Skeleton/>
      </div>
    </div>
  )

  if( feed.length <= 0 ) return (
    <div  className='h-screen'>
      <div className='flex flex-col justify-center items-center mt-24'>
        <h1 className='text-center text-2xl font-bold'>No Users Found</h1>
        <p className='text-center text-gray-600 mt-2'>Newly registered will seen here!</p>
        <button className='btn mt-10  text-white py-2 px-4 rounded  transition'>
          <Link to={'/'} className='no-underline'>
            Home
          </Link>
        </button>
      </div>
    </div>
  )

  return (
    <div className='flex justify-center items-center mt-14'>
      {
        loading ?
          <Skeleton/>
        :
        <>
          <div className='w-9/12 h-screen'>
            {feed &&
              <div className='flex my-14 gap-6 '>
                <div className='w-[36%]'>
                  <UserCard user={feed[0]} />
                </div>
              </div>
            }
          </div>
        </>
      }
    </div>
  )
}

export default Feed
