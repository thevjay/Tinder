import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../../utils/feedSlice';
import toast from 'react-hot-toast'

const UserCard = ({ user }) => {
    
    const dispatch = useDispatch()

    const capitalizeFirstLetter = (string) => {
        return string?.charAt(0).toUpperCase() + string?.slice(1);
    };

    const { _id ,firstName, lastName, photoUrl, age, about, gender,skills } = user;

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
            //console.error(error)
            setError(error.response.data.message)
            toast(error.response.data.message+"😁", { duration: 2000, position: 'bottom-left' })
        }
    };

  return (
    <div>
        <div className="card bg-base-300 w-96 shadow-xl">
            <figure>
                <img
                    className='rounded-lg w-52 mt-5'
                    src={photoUrl}
                    alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{capitalizeFirstLetter(firstName) + " " + capitalizeFirstLetter(lastName)}</h2>
                <p className='m-0'>Age: {age} Year</p>
                <p className='m-0 w-72'>Skills: {skills}</p>
                { age && gender && <p>{age + " " + gender}</p>}
                <p>{about}</p>
                <div className="card-actions justify-center my-8 gap-6">
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
