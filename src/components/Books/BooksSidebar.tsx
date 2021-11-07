/* eslint-disable jsx-a11y/no-static-element-interactions */
import { observer } from 'mobx-react';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { ReactComponent as CheckMarkSVG } from '../../img/check-mark.svg';
import { ReactComponent as UnreadSVG } from '../../img/unread.svg';
import { ReactComponent as StarSVG } from '../../img/star.svg';
import NewBook from './NewBook';

// const items = [
//   {},
// ];

const BooksSidebar = observer(({ addBook }) => {
  const history = useHistory();
  const location = useLocation();

  return (
    <div className="sidebar">
      <NewBook addBook={addBook} />
      <div className={`item${location.pathname === '/books/unread' ? ' active' : ''}`} onMouseUp={() => history.push('/books/unread')}>
        <UnreadSVG />
        <span>Unread books</span>
      </div>
      <div className={`item${location.pathname === '/books/favourite' ? ' active' : ''}`} onMouseUp={() => history.push('/books/favourite')}>
        <StarSVG />
        <span>Favourite</span>
      </div>
      <div className={`item${location.pathname === '/books/finished' ? ' active' : ''}`} onMouseUp={() => history.push('/books/finished')}>
        <CheckMarkSVG />
        <span>
          Finished
        </span>
      </div>
    </div>
  );
});

export default BooksSidebar;
