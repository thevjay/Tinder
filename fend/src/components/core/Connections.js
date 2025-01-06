import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../../utils/connectionSlice'

const Connections = () => {

    const connections = useSelector((store)=> store.connections)
    const dispatch = useDispatch();
    const fetchConnection = async() => {
        try{

            const res = await axios.get(BASE_URL + '/user/connections',
                { withCredentials: true })

            console.log(res.data.data)
            dispatch(addConnections(res.data.data));
        }catch(error){
            console.error(error)
        }
    }

    useEffect(()=>{
        fetchConnection();
    },[])

    if(!connections) return;

    if(connections.length === 0) return <h1> No Connection is Found</h1>
  return (
    <div className='text-center my-10'>
      <h1 className='text-3xl font-bold'>Connections</h1>

      { connections.map((connection) => {
        const {_id, firstName, lastName, photoUrl, age, gender, about } = connection;

        return (
            <div key={_id} className='flex m-4 p-4 rounded-lg bg-base-200 w-1/2 mx-auto'>
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
            </div>   
        )
        })}
    </div>
  )
}

export default Connections
