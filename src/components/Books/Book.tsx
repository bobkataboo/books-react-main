// @ts-nocheck
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Button, Menu, MenuItem } from '@mui/material';
import { observer } from 'mobx-react';
import React, { useState, useRef } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { AnimateSharedLayout, motion, useMotionValue } from 'framer-motion';
import { padding } from '@mui/system';
import { apiDelete } from '../../api/api';
import Reader from '../Reader/Reader';
import { BookInterface } from './Books';
import { ReactComponent as StarredBookSVG } from '../../img/book-starred.svg';
import { ReactComponent as UnstarredBookSVG } from '../../img/book-unstarred.svg';
import Overlay from '../Shared/Overlay';

const dismissDistance = 150;
const openSpring = { type: 'spring', stiffness: 100, damping: 30 };
const closeSpring = { type: 'spring', stiffness: 1000, damping: 1000 };

const BookActions = observer(({
  book, store, menuOpen, handleClick, history, anchorEl, handleClose, setIndex, index, darkMode, setCurrentPath,
}) => {
  const location = useLocation();
  return (
    <div className="center-flex p ps3 pb3">
      <motion.div
        whileTap={{ scale: 0.8 }}
        whileHover={{
          scale: 1.1,
          color: 'rgb(255, 255, 255)',
          backgroundColor: darkMode ? '#174954' : '#117D95',
        }}
        className="btn mr"
      >
        Read
      </motion.div>
      <motion.div
        whileTap={{ scale: 0.8 }}
        whileHover={{
          scale: 1.1,
          color: 'rgb(255, 255, 255)',
          backgroundColor: darkMode ? '#174954' : '#117D95',
        }}
        className="btn"
        onClick={(event) => {
          setCurrentPath(location.pathname);
          setIndex(index);
          event.stopPropagation();
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
  );
});

const BookContent = observer(({
  cardRef,
  isSelected,
  checkSwipeToDismiss,
  checkZIndex,
  book,
  store,
  menuOpen,
  handleClick,
  history,
  anchorEl,
  handleClose,
  setIndex,
  index,
  darkMode,
  setCurrentPath,
}) => (
  <>

    <motion.div
      ref={cardRef}
      className="book-content"
      onDrag={checkSwipeToDismiss}
      onUpdate={checkZIndex}
    >
      <motion.div>
        <motion.div style={{ height: 320 }} className="cover center">
          <motion.img style={{ height: 320 }} src={book.coverUrl} alt="book cover" />
        </motion.div>
        <div className="title">
          {book.title}
        </div>
        <BookActions
          darkMode={darkMode}
          index={index}
          setIndex={setIndex}
          book={book}
          store={store}
          menuOpen={menuOpen}
          handleClick={handleClick}
          history={history}
          anchorEl={anchorEl}
          handleClose={handleClose}
          setCurrentPath={setCurrentPath}
        />
      </motion.div>
    </motion.div>

  </>
));

const Book = observer(({
  book, store, index, isSelected, bookId, setIndex, darkMode, setCurrentPath,
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

      <Overlay isSelected={isSelected} />
      <motion.div
        layoutId={book.id}
          // style={}
        onClick={() => {
          setOpen(true);
        }}
        onKeyUp={() => setOpen(true)}
        key={book.id}
        className="book-content-container hand"
      >

        <Reader index={index} store={store} book={book} close={setOpen} open={open} />
        <BookContent
          setCurrentPath={setCurrentPath}
          darkMode={darkMode}
          index={index}
          setIndex={setIndex}
          checkSwipeToDismiss={checkSwipeToDismiss}
          checkZIndex={checkZIndex}
          isSelected={isSelected}
          cardRef={cardRef}
          book={book}
          store={store}
          menuOpen={menuOpen}
          handleClick={handleClick}
          history={history}
          anchorEl={anchorEl}
          handleClose={handleClose}
        />
      </motion.div>
    </div>
  );
});

export default Book;
