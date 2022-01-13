import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';

interface IProps {
    isSelected: boolean,
    redirect: boolean,
    handleClose: () => void
}

const variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
    },
  },
  exiting: {
    opacity: 0,
    transition: { duration: 0.4 },
  },
};

const InnerOverlay = ({ isSelected, redirect, handleClose }:IProps) => (
  <AnimatePresence>
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exiting"
      variants={variants}
      style={{ pointerEvents: isSelected ? 'auto' : 'none' }}
      className="overlay"
      onClick={(event) => event.stopPropagation()}
    >
      {redirect
        ? <Link to="/books" />
        : (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
          <div onMouseUp={handleClose} style={{ width: '100%', height: '100%' }} />
        )}
    </motion.div>
  </AnimatePresence>

);

const Overlay = ({ isSelected, redirect = true, handleClose }:IProps) => (
  isSelected ? (
    ReactDOM.createPortal(<InnerOverlay redirect={redirect} handleClose={handleClose} isSelected={isSelected} />, document.getElementById('App'))

  ) : null
);

export default Overlay;
