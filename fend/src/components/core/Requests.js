import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests } from '../../utils/requestSlice';

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch()

  const fetchRequests = async() => {
    try{
      const res = await axios.get(BASE_URL + '/user/requests/received',
        {withCredentials: true}
      )

      console.log(res.data.data)
      dispatch(addRequests(res.data.data))
    }catch(error){
      console.error(error);
    }
  }

  useEffect(()=>{
    fetchRequests()
  },[])

  if(!requests) return;

  if(requests.length === 0) return <h1> No Requests is Found</h1>
return (
  <div className='text-center my-10'>
    <h1 className='text-3xl font-bold'>Requests</h1>

    { requests.map((request) => {
      const { _id,firstName, lastName, photoUrl, age, gender, about } = request.fromUser;

      return (
          <div key={_id} className='flex justify-between items-center  m-4 p-4 rounded-lg bg-base-200 w-2/3 mx-auto'>
              <div>
                  <img 
                      alt='photo'
                      className='w-20 h-20 rounded-full' 
                      src={photoUrl}
                  />
              </div>
              <div className='text-left mx-4 '>
                  <h2 className='font-bold text-3xl '>{ firstName + " " + lastName}</h2>
                  <p>{ about }</p>
                  { age && gender && <p>{ age + " " + gender }</p>}
                  <p>{ about }</p>
              </div>
              <div>
                <button className="btn btn-active btn-primary mx-2">Reject</button>
                <button className="btn btn-active btn-secondary mx-2">Accept</button>
              </div>
          </div>   
      )
      })}
  </div>
)
}

export default Requests
