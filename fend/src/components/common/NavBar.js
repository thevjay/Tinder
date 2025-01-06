import axios from 'axios'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../../utils/constants'

const NavBar = () => {

  const user = useSelector((Store) => Store.user)

  const handleLogout = async() => {
    try{
       await axios.post(BASE_URL +"/logout",
        {},
        { withCredentials: true}
      )
    }
    catch(error){
      //Error login maybe redirect to error page
      console.error(error)
    }
  }
  //console.log(user)
  return (
    <div>
            <div className="navbar bg-base-200">
  <div className="flex-1">
    <Link to={'/'} className="btn btn-ghost text-xl">👨‍💻 DevTinder</Link>
  </div>
  { user && (<div className="flex-none gap-2">
    {/* <div className="form-control">
      <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
    </div> */}
    <div>
      Welcome, {user.firstName}
    </div>
    <div className="dropdown dropdown-end mx-5">
      
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={ user.photoUser || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" }  />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <Link to={'/profile'} className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><a>Settings</a></li>
        <li>
          <a onClick={handleLogout}>Logout</a>
        </li>
      </ul>
    </div>
  </div>)}
</div>
    </div>
  )
}

export default NavBar
