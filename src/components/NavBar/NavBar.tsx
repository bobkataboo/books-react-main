/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { observer } from 'mobx-react';
import { Link, useHistory } from 'react-router-dom';
import { logout } from '../../api/api';
import user from '../../Stores/UserStore';

const NavBar = observer(() => {
  const history = useHistory();

  return (
    <div className="NavBar flex">

      <div className="grow" />
      {user.isLoggedIn ? (
        <>
          <div className="nav-btn">
            <Link to="/books">
              Books
            </Link>
          </div>
          <div className="nav-btn">
            <div onClick={() => logout(history)} onKeyUp={logout}>
              Logout
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="nav-btn">
            <Link to="/login">
              Login
            </Link>
          </div>
          <div className="nav-btn">
            <Link to="/register">
              Register
            </Link>
          </div>
        </>
      ) }

    </div>
  );
});

export default NavBar;
