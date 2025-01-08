import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../../utils/feedSlice';

const UserCard = ({ user }) => {
    
    const dispatch = useDispatch()
    const { _id ,firstName, lastName, photoUrl, age, about, gender } = user;

    const [error, setError] = useState('')
    
    const handleSendRequest = async (status,userId) => {
        try{
            const res = await axios.post(
                process.env.REACT_APP_API_URL + '/request/send/' + status + "/" + userId,
                {},
                { withCredentials: true }
            );
            dispatch(removeUserFromFeed(userId))
        }catch(error){
            console.error(error)
            setError(error.response.data.message)
        }
    };

  return (
    <div>
        <div className="card bg-base-300 w-96 shadow-xl">
            <figure>
                <img
                src={photoUrl}
                alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                { age && gender && <p>{age + " " + gender}</p>}
                <p>{about}</p>
                <p className='text-red-700'>{error}</p>
                <div className="card-actions justify-center my-4">
                    <button 
                        className="btn btn-primary" 
                        onClick={() => handleSendRequest("ignore",_id)}
                    >
                        Ignore
                    </button>
                    <button 
                        className="btn btn-secondary"
                        onClick={() => handleSendRequest("interested",_id)}
                    >
                        Interested
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserCard
