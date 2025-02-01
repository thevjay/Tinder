import  io  from "socket.io-client";
import { Base_URL } from "./constants";

export const createSocketConnection = () => {
    return io(Base_URL);

    // if(location.hostname === 'localhost'){
    //     return io(BASE_URL);
    // }else{
    //     return io("/", {path:'/api/socket.io'})
    // }
}