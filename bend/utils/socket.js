const socket = require('socket.io')



const initializeSocket = (server) =>{
    const io = socket(server,{
        cors:{
            origin:process.env.FRONTEND_URL,
        },
    })
    
    io.on('connection',(socket)=>{
        // Handle events
    })
}

module.exports = initializeSocket;