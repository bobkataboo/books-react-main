import { observer } from 'mobx-react'
import React from 'react'
import { Link } from 'react-router-dom'
import user from '../../Stores/UserStore'
import Login from '../Login/Login'

const NavBar = observer(() => {
    return <div className="NavBar flex">

       <div className="grow">

       </div>
           {user.loggedIn ? <><div className="nav-btn">
           <Link to="/books" >
                Books
            </Link>
       </div>
       <div className="nav-btn">
           <div>
                Logout
           </div>
       </div></> : <><div className="nav-btn">
           <Link to="/login" >
                Login
            </Link>
       </div>
       <div className="nav-btn">
           <Link to="/register">
                Register
           </Link>
       </div></> }
       
    </div>
})

export default NavBar