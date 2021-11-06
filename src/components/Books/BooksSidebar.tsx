import { observer } from 'mobx-react';
import React from 'react';
import { ReactComponent as CheckMarkSVG } from '../../img/check-mark.svg';
import { ReactComponent as UnreadSVG } from '../../img/unread.svg';
import { ReactComponent as StarSVG } from '../../img/star.svg';
import NewBook from './NewBook';

// const items = [
//   {},
// ];

const BooksSidebar = observer(({ addBook }) => (
  <div className="sidebar">
    <div className="item">
      <NewBook addBook={addBook} />
    </div>
    <div className="item">
      <UnreadSVG />
      <span>Unread books</span>
    </div>
    <div className="item">
      <StarSVG />
      <span>Favourite</span>
    </div>
    <div className="item">
      <CheckMarkSVG />
      <span>
        Finished
      </span>
    </div>
  </div>
));

export default BooksSidebar;
