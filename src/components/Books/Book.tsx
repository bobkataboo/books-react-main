// @ts-nocheck
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Button, Menu, MenuItem } from '@mui/material';
import { observer } from 'mobx-react';
import React, { useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
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

const BookDescription = observer(() => (
  <div>
    Lorem ipsu rutrum tellus pellentesque eu tincidunt tortor aliquam. Donec ac odio tempor orci dapibus ultrices in iaculis nunc. Sit amet tellus cras adipiscing enim eu turpis egestas pretium. Sit amet mattis vulputate enim nulla aliquet porttitor lacus. Enim praesent elementum facilisis leo vel fringilla est ullamcorper. Facilisi nullam vehicula ipsum a arcu cursus vitae. Posuere ac ut consequat semper viverra. Ut tortor pretium viverra suspendisse. Sit amet consectetur adipiscing elit duis.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lacus sed viverra tellus in hac. Bibendum est ultricies integer quis auctor elit. Morbi enim nunc faucibus a pellentesque sit amet. Molestie nunc non blandit massa enim nec. Sit amet dictum sit amet justo. Orci dapibus ultrices in iaculis. Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi tristique. Libero justo laoreet sit amet. Mauris augue neque gravida in fermentum et sollicitudin ac. Auctor augue mauris augue neque gravida. Tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Donec ac odio tempor orci dapibus ultrices in iaculis nunc. Sit amet tellus cras adipiscing enim eu turpis egestas pretium. Sit amet mattis vulputate enim nulla aliquet porttitor lacus. Enim praesent elementum facilisis leo vel fringilla est ullamcorper. Facilisi nullam vehicula ipsum a arcu cursus vitae. Posuere ac ut consequat semper viverra. Ut tortor pretium viverra suspendisse. Sit amet consectetur adipiscing elit duis.
  </div>
));

const BookActions = observer(({
  book, store, menuOpen, handleClick, history, anchorEl, handleClose, setIndex, index,
}) => {
  const bo = 'cool';
  // console.log('@@@@ bo', bo);
  return (
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
          setIndex(index);
          event.stopPropagation();
          // console.log('@@@@@@@ book.id', book.id);
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
}) => (
  <>

    <motion.div
      ref={cardRef}
      className="book-content"
  // style={{ zIndex, y }}
  // layoutTransition={isSelected ? openSpring : closeSpring}
      // drag={isSelected ? 'y' : false}
      onDrag={checkSwipeToDismiss}
      onUpdate={checkZIndex}
      // style={isSelected ? { display: 'flex', padding: 32, width: '100%' } : null}
    >
      <motion.div>
        <motion.div style={{ height: 320 }} className="cover center">
          <motion.img style={{ height: 320 }} src={book.coverUrl} alt="book cover" />
        </motion.div>
        <div className="title">
          {book.title}
        </div>
        {/* <div className="progress">
       Progress: 67%
        </div> */}
        <BookActions
          index={index}
          setIndex={setIndex}
          book={book}
          store={store}
          menuOpen={menuOpen}
          handleClick={handleClick}
          history={history}
          anchorEl={anchorEl}
          handleClose={handleClose}
        />
      </motion.div>
      {/* {isSelected && (
        <>
          <motion.div className="grow" />
          <motion.div style={{ width: 400, height: '100%' }}>
            <BookDescription />
          </motion.div>
        </>
      )} */}
    </motion.div>

  </>
));

const Book = observer(({
  book, store, index, isSelected, bookId, setIndex,
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
