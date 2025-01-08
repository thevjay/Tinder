import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../../utils/feedSlice'
import UserCard from './UserCard'

const Feed = () => {

  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed)


  const getFeed = async() => {
    if(feed) return;
    try{
      const res = await axios.get(process.env.REACT_APP_API_URL+'/feed',{withCredentials:true})
    
      dispatch(addFeed(res.data))
    }catch(error){
      console.error(error)
    }
  }

  useEffect(() => {
    getFeed()
  },[])

  if(!feed) return;

  if( feed.length <= 0 ) return <h1 className='flex justify-center my-10'>No New users founds!</h1>

  return (
      feed && (
      <div className='flex justify-center my-10'>
        <UserCard user={feed[0]} />
      </div>)
  )
}

export default Feed
