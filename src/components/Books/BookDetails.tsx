import { Button, Menu, MenuItem } from '@mui/material';
import { observer } from 'mobx-react';
import Scrollbars from 'rc-scrollbars';
import React, { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { apiDelete } from '../../api/api';
import { ReactComponent as StarredBookSVG } from '../../img/book-starred.svg';
import { ReactComponent as UnstarredBookSVG } from '../../img/book-unstarred.svg';
import Reader from '../Reader/Reader';
// import Reader from '../Reader/Reader';
import BookDetailsStore from './BookDetailsStore';

const BookDetails = observer(({ bookId }:any) => {
  const history = useHistory();
  const store = useMemo(() => new BookDetailsStore(bookId), [bookId]);
  const { book } = store;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const menuOpen = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  if (!book) return null;

  return (
    <div className="BookDetails">
      <div
        className="book"
      >
        <Reader
          index={0}
          bookDetailsStore={store}
          book={book}
          close={store.setOpen}
          open={store.open}
        />
        <div className="left">
          <div className="cover">
            <img src={book.coverUrl} alt="book cover" />
          </div>
          <div className="title center-flex">
            {book.title}
          </div>
          <div className="subtitle pb">
            {book.subtitle}
          </div>
          {/* <div className="progress">
            Progress: 67%
          </div> */}
          <div className="flex">
            <Button
              id="basic-button"
              aria-controls="basic-menu"
              aria-haspopup="true"
              className="hand"
              onClick={() => store.setOpen(true)}
            >
              Read
            </Button>
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
                apiDelete(`api/books/${book.id}`).then(() => history.push('/books'));
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
        <div className="right">
          <Scrollbars>
            <div className="description">
              {book.description}
            </div>
          </Scrollbars>
        </div>
      </div>
    </div>
  );
});

export default BookDetails;
