/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Button, Menu, MenuItem } from '@mui/material';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { apiDelete } from '../../api/api';
import Reader from '../Reader/Reader';
import { BookInterface } from './Books';
import { ReactComponent as StarredBookSVG } from '../../img/book-starred.svg';
import { ReactComponent as UnstarredBookSVG } from '../../img/book-unstarred.svg';

const Book = observer(({
  book, store, index,
}:BookInterface) => {
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const menuOpen = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div
      onClick={() => {
        setOpen(true);
      }}
      onKeyUp={() => setOpen(true)}
      key={book.id}
      className="book"
    >
      <Reader index={index} store={store} book={book} close={setOpen} open={open} />
      <div className="cover">
        <img src={book.coverUrl} alt="book cover" />
      </div>
      <div className="title">
        {book.title}
      </div>
      <div className="progress">
        Progress: 67%
      </div>
      <div className="flex p2">
        <Button
          id="basic-button"
          aria-controls="basic-menu"
          aria-haspopup="true"
          className="hand"
        >
          Read
        </Button>
        <Button
          id="basic-button"
          aria-controls="basic-menu"
          aria-haspopup="true"
          className="hand"
          onClick={(event) => {
            event.stopPropagation();
            history.push(`/books/${book.id}`);
          }}
        >
          Details
        </Button>
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
          </Menu>
        </div>
      </div>
    </div>
  );
});

export default Book;
