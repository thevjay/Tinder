import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createSocketConnection } from '../../utils/socket';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Base_URL } from '../../utils/constants';

const Chat = () => {

    const { targetUserId } = useParams();

    const [messages,setMessages] = useState([]);
    const [newMessage,setNewMessage] = useState('');
    const chatContainerRef = useRef(null);
    const lastMessageRef = useRef(null);

    useEffect(()=>{
      if(lastMessageRef.current){
        lastMessageRef.current.scrollIntoView({behavior: "smooth"})
      }
    },[messages]);

    const user = useSelector((store)=>store.user)
    const userId = user?._id;

    const fetchChatMessage = async()=>{
      try{
      const chat = await axios.get(Base_URL+"/chat/"+targetUserId,{
        withCredentials:true,     
       })

       console.log(chat.data.messages);

       const chatMessages = chat?.data?.messages.map((msg)=>{
          const {senderId, text} = msg;
        return { 
          firstName: senderId?.firstName, 
          lastName:senderId?.lastName, 
          text: text
        }
       })
       setMessages(chatMessages)
      }
      catch(err){
        console.error(err)
      }
    }

    useEffect(()=>{
      fetchChatMessage();
    },[])

    useEffect(()=>{
        if(!userId) return;
        const socket = createSocketConnection();
        // As soon as the page loaded, the socket connection is made and joinChat event is emitted
        socket.emit('joinChat', { firstName:user.firstName ,userId, targetUserId });

        socket.on("messageReceived", ({ firstName,lastName, text})=>{
            console.log(firstName+" : "+text)
            setMessages((messages)=>[...messages,{firstName,lastName,text}])
        })

        return () =>{
            socket.disconnect();
        }
    },[userId,targetUserId])

    const sendMessage = () => {
        const socket = createSocketConnection()
        socket.emit("sendMessage",{
            firstName : user.firstName,
            lastName : user.lastName,
            userId,
            targetUserId,
            text:newMessage
        })
        setNewMessage('')
    }

  return (
    <div className='w-1/2 mx-auto border border-gray-600 m-5 h-[80vh] flex flex-col'>
      <h1 className='p-5 border-b border-gray-400'>Chat</h1>
      <div ref={chatContainerRef} className='flex-1 overflow-y-auto p-5'>
        {/* Display messages */}
        {messages.map((msg,index)=>{
          return(
            <div key={index} ref={index=== messages.length -1 ? lastMessageRef : null} className={`chat ${user?.firstName === msg?.firstName ? 'chat-end' : 'chat-start'}`}>
              <div className="chat-header">
                {`${msg.firstName} ${msg.lastName}`} 
                <time className="text-xs opacity-50">2 hours ago</time>
              </div>
              <div className="chat-bubble">{msg.text}</div>
              <div className="chat-footer opacity-50">Seen</div>
            </div>
        )})}
      </div>
      <div className='p-5 border-b border-gray-600 flex items-center gap-2 '>
        <input 
            value={newMessage} 
            onChange={(e)=> setNewMessage(e.target.value)}
            className='flex-1 border border-gray-500 text-white rounded p-2'
        ></input>
        <button onClick={sendMessage} className='btn btn-secondary' >Send</button>
      </div>
    </div>
  )
}

export default Chat

