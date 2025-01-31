import { BrowserRouter , Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'
import React from 'react'
import Body from './components/core/Body';
import Login from './components/core/Login';
import Profile from './components/core/Profile';

import { Provider, useSelector } from 'react-redux';
import appStore from './utils/appStore';
import Feed from './components/core/Feed';
import Connections from './components/core/Connections';
import Requests from './components/core/Requests';
import NavBar from './components/common/NavBar';
import Footer from './components/common/Footer';
import Premium from './components/core/Premium';

import Chat from './components/core/Chat';


function App() {
  
  return (
    <div>
      <Provider store={appStore}>
        <Toaster position='bottom-left' reverseOrder={false}/>
        <BrowserRouter basename='/'>
          <NavBar/>
          <Routes>
            <Route path='/' element={<Body />}>
              <Route path='/' element={<Feed/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/profile' element={<Profile/>}/>
              <Route path='/connections' element={<Connections/>}/>
              <Route path='/requests' element={<Requests/>}/>
              <Route path='/premium' element={<Premium/>}/>
              <Route path='/chart/:targetUserId' element={<Chat/>} />
            </Route>
          </Routes>
          <Footer/>
        </BrowserRouter>
      </Provider>
    </div>
  )
}


export default App;
