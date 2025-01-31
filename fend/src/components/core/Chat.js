import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

const Chat = () => {

    const { targetUserId } = useParams();

    const [messages,setMessages] = useState([{text:"Hello World"}]);

    console.log(targetUserId)
    console.log(messages)
  return (
    <div className='w-1/2 mx-auto border border-gray-600 m-5 h-[80vh] flex flex-col bg-slate-50'>
      <h1 className='p-5 border-b border-gray-600'>Chat</h1>
      <div className='flex-1 overflow-scroll p-5'>
        {/* Display messages */}
        {messages.map((msg,index)=>(
            <div className="chat chat-start">
            <div className="chat-header">
              Obi-Wan Kenobi
              <time className="text-xs opacity-50">2 hours ago</time>
            </div>
            <div className="chat-bubble">You were the Chosen One!</div>
            <div className="chat-footer opacity-50">Seen</div>
          </div>
        ))}
      </div>
      <div className='p-5 border-b border-gray-600 flex items-center gap-2 bg-gray-100'>
        <input className='flex-1 border border-gray-500 text-white rounded p-2'></input>
        <button className='btn btn-secondary'>Send</button>
      </div>
    </div>
  )
}

export default Chat
