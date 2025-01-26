import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addRequests, removeRequest } from '../../utils/requestSlice';
import { Link } from 'react-router-dom'
import { Base_URL } from '../../utils/constants';

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch()
 
  const capitalizeFirstLetter = (string) => {
    return string?.charAt(0).toUpperCase() + string?.slice(1);
  };

  //const [showButtons, setShowButtons] = useState(true);

  const reviewRequest = async (status,_id) => {
    try{

      const res = axios.post(Base_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id))
    }catch(error){
      console.error(error)
    }
  }

  const fetchRequests = async() => {
    try{
      const res = await axios.get(Base_URL + '/user/requests/received',
        {withCredentials: true}
      )
      dispatch(addRequests(res.data.data))
    }catch(error){
      console.error(error);
    }
  }

  useEffect(()=>{
    fetchRequests()
  },[])

  if(!requests) return (
    <div className='h-screen'>
            <div className='flex flex-col justify-center items-center mt-24'>
                <h1 className='text-center text-2xl font-bold'>No Requests Found</h1>
                <p className='text-center text-gray-600 mt-2'>If someone is interested in your profile, they will send you a request.</p>
                <button className='btn mt-10  text-white py-2 px-4 rounded  transition'>
                    <Link to={`/feed`} className='no-underline'>
                        Home
                    </Link>
                </button>
            </div>

        </div>
  )

  if(requests.length === 0) return (
    <div className='h-screen'>
            <div className='flex flex-col justify-center items-center mt-24'>
                <h1 className='text-center text-2xl font-bold'>No Requests Found</h1>
                <p className='text-center text-gray-600 mt-2'>If someone is interested in your profile, they will send you a request.</p>
                <button className='btn mt-10  text-white py-2 px-4 rounded  transition'>
                    <Link to={`/feed`} className='no-underline'>
                        Home
                    </Link>
                </button>
            </div>

        </div>
  )

  return (
    <div className='mt-24'>
      <div className="flex justify-center items-center">
        <h1 className="text-2xl  btn rounded-md">Requests</h1>
      </div>

      <div className="flex flex-col items-center">
      { requests && requests.map((request) => {
          // Check if fromUserId exists before destructuring
          const { _id, firstName, lastName, photoUrl, age, gender, about } = request.fromUserId || {};

        return (
            <div 
              role="alert"
              key={ _id }
              className="alert shadow-md m-3 border border-black rounded-lg p-4 w-full max-w-3xl flex justify-between"
            >
                <div className="flex items-center mb-3">
                    <img 
                        alt='photo'
                        className='w-20 h-20 rounded-full' 
                        src={photoUrl}
                    />
                </div>
                <div className="ml-4">
                    <h3 className='font-bold text-xl '>{ capitalizeFirstLetter(firstName) + " " + capitalizeFirstLetter(lastName) }</h3>
                    <p>{ about }</p>
                    { age && gender && <p>{ age + " " + gender }</p>}
                    <p>{ about }</p>
                </div>

                <div className="flex justify-end space-x-2">
                  <button 
                    className="btn btn-active btn-primary mx-2" 
                    onClick={()=> reviewRequest("rejected", request._id)}
                  >
                    Reject
                  </button>
                  <button 
                    className="btn btn-active btn-secondary mx-2"
                    onClick={()=> reviewRequest("accepted", request._id)}
                  >
                    Accept
                  </button>
                </div>
            </div>   
       )
      })}
      </div>
    </div>
  )
}

export default Requests
