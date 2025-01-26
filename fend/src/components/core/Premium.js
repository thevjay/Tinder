
import React from 'react'
import axios from 'axios';

import {BASE_URL} from '../../utils/constants'

const Premium = () => {

  const handleBuyClick=async(type)=>{
    try{
      const order = await axios.post(BASE_URL+'/payment/create',{
        membershipType:type,
      },{
        withCredentials:true
      })

      // It should open the Razorpay Dialog Box
      
      const { amount , keyId,currency,notes,orderId } = order.data;

      // Open Razorpay Checkout
        const options = {
          key:keyId, 
          amount, 
          currency,
          name: 'Dev Tinder',
          description: 'Test Transaction',
          order_id: orderId, 
          prefill: {
            name: notes.firstName + " " + notes.lastName,
            email: notes.emailId,
            contact: '9999999999',
          },
          theme: {
            color: '#F37254'
          },
        };
    
  const rzp = new window.Razorpay(options);
  rzp.open();


    }
    catch(error){
      console.error(error)
    }
  }

  
  return (
    <div className='m-10'>
      <div className="flex w-full">
        <div className="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center">
            <h1 className='font-bold text-3xl'>Silver Membership</h1>
            <ul>
                <li> - chat with othet people</li>
                <li> - 180 connection Requests per day</li>
                <li> - Blue Tick</li>
                <li> - 3 months</li>
            </ul>
            <button onClick={()=>handleBuyClick("silver")} className='btn btn-secondary'>Buy Silver</button>
        </div>
        <div className="divider divider-horizontal">OR</div>
        <div className="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center">
            <h1 className='font-bold text-3xl'>Gold Membership</h1>
            <ul>
                <li> - chat with othet people</li>
                <li> - 180 connection Requests per day</li>
                <li> - Blue Tick</li>
                <li> - 6 months</li>
            </ul>
            <button onClick={()=>handleBuyClick("gold")} className='btn btn-primary'>Buy Gold</button>
        </div>
      </div>
    </div>
  )
}

export default Premium

