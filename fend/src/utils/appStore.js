import { configureStore } from '@reduxjs/toolkit';
import  useReducer  from '../utils/userSlice';
import feedReducer from './feedSlice';
import connectionReducer from '../utils/connectionSlice'
import requestReducer from '../utils/requestSlice';

const appStore =configureStore({
    reducer:{
        user:useReducer,
        feed: feedReducer,
        connections: connectionReducer,
        requests: requestReducer, 
    }
})

export default appStore;