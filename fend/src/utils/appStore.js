import { configureStore } from '@reduxjs/toolkit';
import  useReducer  from '../utils/userSlice';
import feedReducer from './feedSlice';

const appStore =configureStore({
    reducer:{
        user:useReducer,
        feed: feedReducer,
    }
})

export default appStore;