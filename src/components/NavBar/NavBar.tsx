/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { observer } from 'mobx-react';
import { Link, useHistory } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { logout } from '../../api/api';
import { ReactComponent as LogoSVG } from '../../img/logo.svg';
import { ReactComponent as MoonSVG } from '../../img/moon.svg';
import { ReactComponent as SunSVG } from '../../img/sun.svg';
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
        <motion.div className="nav-btn dark-mode" onMouseUp={() => setDarkMode(!darkMode)}>
          <AnimatePresence>
            {darkMode && (
            <motion.div
              transition={{ duration: 0.4 }}
              style={{ position: 'absolute' }}
              initial={{ opacity: 0, scale: 2.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
            >
              <SunSVG width={25} />
            </motion.div>
            )}
            {/* {darkMode ? <SunSVG width={25} /> : <MoonSVG width={25} />} */}
          </AnimatePresence>
          <AnimatePresence>
            {!darkMode && (
            <motion.div
              transition={{ duration: 0.4 }}
              style={{ position: 'absolute' }}
              initial={{ opacity: 0, scale: 2.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
            >
              <MoonSVG width={25} />
            </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      </div>
    </div>
  );
});

export default NavBar;
