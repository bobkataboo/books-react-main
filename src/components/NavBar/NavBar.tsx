import React from 'react'
import { Link } from 'react-router-dom'
import Login from '../Login/Login'

const NavBar = () => {
    return <div className="NavBar flex">

       <div className="grow">

       </div>
       <div className="nav-btn">
           <Link to="/login" >
                Login
            </Link>
       </div>
       <div className="nav-btn">
           <Link to="/register">
                Register
           </Link>
       </div>
    </div>
}

export default NavBar