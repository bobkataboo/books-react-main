/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { observer } from 'mobx-react';
import { Link, useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import { logout } from '../../api/api';
import { ReactComponent as LogoSVG } from '../../img/logo.svg';
import user from '../../Stores/UserStore';

const NavBar = observer(({ darkMode, setDarkMode }) => {
  const history = useHistory();

  return (
    <div className="NavBar flex">
      <div onMouseUp={() => history.push('/books')} style={{ paddingLeft: '10%' }} className="center hand">
        <LogoSVG />
      </div>

      <div className="grow" />
      <div className="links-container">
        {user.isLoggedIn ? (
          <>
            <div className="nav-btn">
              <motion.div
                whileHover={{ fontSize: '23px', fontWeight: 500 }}
                onClick={() => history.push('/books')}
              >
                Books
              </motion.div>
            </div>
            <div className="nav-btn">
              <motion.div
                whileHover={{ fontSize: '23px', fontWeight: 500 }}
                onClick={() => logout(history)}
                onKeyUp={logout}
              >
                Logout
              </motion.div>
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
        <div className="nav-btn" onMouseUp={() => setDarkMode(!darkMode)}>
          {darkMode ? 'Light theme' : 'Dark theme'}
        </div>
      </div>
    </div>
  );
});

export default NavBar;
