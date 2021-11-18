// @ts-nocheck
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Button, Menu, MenuItem } from '@mui/material';
import { observer } from 'mobx-react';
import React, { useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { motion, useMotionValue } from 'framer-motion';
import { apiDelete } from '../../api/api';
import Reader from '../Reader/Reader';
import { BookInterface } from './Books';
import { ReactComponent as StarredBookSVG } from '../../img/book-starred.svg';
import { ReactComponent as UnstarredBookSVG } from '../../img/book-unstarred.svg';

const dismissDistance = 150;
const openSpring = { type: 'spring', stiffness: 100, damping: 30 };
const closeSpring = { type: 'spring', stiffness: 1000, damping: 1000 };

const Overlay = ({ isSelected, history }:{isSelected: boolean, history: any}) => (
  <motion.div
    initial={false}
    animate={{ opacity: isSelected ? 1 : 0 }}
    transition={{ duration: 0.3 }}
    style={{ pointerEvents: isSelected ? 'auto' : 'none' }}
    className="overlay"
    onClick={(event) => event.stopPropagation()}
  >
    <Link to="/books" />
  </motion.div>
);

const Book = observer(({
  book, store, index, isSelected, bookId,
}:BookInterface) => {
  const history = useHistory();
  const y = useMotionValue(0);
  const zIndex = useMotionValue(isSelected ? 2 : 0);

  // We'll use the opened card element to calculate the scroll constraints
  const cardRef = useRef(null);

  function checkSwipeToDismiss() {
    // eslint-disable-next-line no-unused-expressions
    y.get() > dismissDistance && history.push('/');
  }

  function checkZIndex(latest) {
    if (isSelected) {
      zIndex.set(2);
    } else if (!isSelected && latest.scaleX < 1.01) {
      zIndex.set(0);
    }
  }

  // When this card is selected, attach a wheel event listener
  const [open, setOpen] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const menuOpen = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="book">
      <Overlay isSelected={isSelected} history={history} />
      <motion.div
        layout
        style={isSelected ? {
          position: 'fixed',
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          margin: 'auto',
          zIndex: '10',
        } : null}
        onClick={() => {
          setOpen(true);
        }}
        onKeyUp={() => setOpen(true)}
        key={book.id}
        className={`book-content-container hand${isSelected ? ' open' : ''}`}
      >

        <Reader index={index} store={store} book={book} close={setOpen} open={open} />
        <motion.div
          ref={cardRef}
          className="book-content"
          // style={{ zIndex, y }}
          // layoutTransition={isSelected ? openSpring : closeSpring}
          drag={isSelected ? 'y' : false}
          onDrag={checkSwipeToDismiss}
          onUpdate={checkZIndex}
        >
          <div className="cover center">
            <img src={book.coverUrl} alt="book cover" />
          </div>
          <div className="title">
            {book.title}
          </div>
          {/* <div className="progress">
        Progress: 67%
      </div> */}
          <div className="center-flex p ps3 pb3">
            <motion.div
              whileTap={{ scale: 0.8 }}
              whileHover={{
                scale: 1.1,
                color: 'white',
                backgroundColor: '#117D95',
              }}
              className="btn mr"
            >
              Read
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.8 }}
              whileHover={{
                scale: 1.1,
                color: 'white',
                backgroundColor: '#117D95',
              }}
              className="btn"
              onClick={(event) => {
                event.stopPropagation();
                console.log('@@@@@@@ book.id', book.id);
                history.push(`/books/${book.id}`);
              }}
            >
              Details
            </motion.div>
            <div className="grow" />
            <div onClick={(event) => event.stopPropagation()}>
              <Button
                style={{ minWidth: 30 }}
                id="basic-button"
                aria-controls="basic-menu"
                aria-haspopup="true"
                onMouseUp={() => store.toggleFavouriteBook(book)}
              >
                {book.favourite ? <StarredBookSVG /> : <UnstarredBookSVG />}
              </Button>
              <Button
                style={{ minWidth: 30 }}
                id="basic-button"
                aria-controls="basic-menu"
                aria-haspopup="true"
                aria-expanded={menuOpen ? 'true' : undefined}
                onClick={handleClick}
              >
                •••
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={menuOpen}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={() => {
                  handleClose();
                  store.deleteBook(book);
                  apiDelete(`api/books/${book.id}`).then(() => store.deleteBook(book));
                }}
                >
                  Delete

                </MenuItem>
                <MenuItem onClick={() => {
                  handleClose();
                  store.toggleFinishBook(book);
                }}
                >
                  {book.finished ? 'Remove from finished' : 'Add to finished'}

                </MenuItem>
              </Menu>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
});

export default Book;
