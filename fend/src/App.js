import { BrowserRouter , Route, Routes } from 'react-router-dom';
import React from 'react'
import Body from './components/core/Body';
import Login from './components/core/Login';
import Profile from './components/core/Profile';

import { Provider } from 'react-redux';
import appStore from './utils/appStore';
import Feed from './components/core/Feed';
import Connections from './components/core/Connections';
import Requests from './components/core/Requests';

function App() {
  return (
    <div>
      <Provider store={appStore}>
        <BrowserRouter basename='/'>
          <Routes>
            <Route path='/' element={<Body />}>
              <Route path='/' element={<Feed/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/profile' element={<Profile/>}/>
              <Route path='/connections' element={<Connections/>}/>
              <Route path='/requests' element={<Requests/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  )
}

export default App;
