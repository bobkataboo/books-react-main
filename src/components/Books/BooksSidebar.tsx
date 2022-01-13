/* eslint-disable jsx-a11y/no-static-element-interactions */
import { observer } from 'mobx-react';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { AnimateSharedLayout, motion } from 'framer-motion';
import { ReactComponent as CheckMarkSVG } from '../../img/check-mark.svg';
import { ReactComponent as UnreadSVG } from '../../img/unread.svg';
import { ReactComponent as StarSVG } from '../../img/star.svg';
import NewBook from './NewBook';
// import NewBookModal from './NewBookModal';

// const items = [
//   {},
// ];

const buttonHoverProps = {
  height: 40, fontSize: '28px',
};

const BooksSidebar = observer(({ addBook }) => {
  const history = useHistory();
  const location = useLocation();

  return (
    <motion.div className="sidebar">
      <AnimateSharedLayout>
        <NewBook addBook={addBook} />
        <motion.div whileHover={buttonHoverProps} className={`item${location.pathname === '/books/unread' ? ' active' : ''}`} onMouseUp={() => history.push('/books/unread')}>
          <UnreadSVG />
          <span>Unread books</span>
        </motion.div>
        <motion.div whileHover={buttonHoverProps} className={`item${location.pathname === '/books/favourite' ? ' active' : ''}`} onMouseUp={() => history.push('/books/favourite')}>
          <StarSVG />
          <span>Favourite</span>
        </motion.div>
        <motion.div whileHover={buttonHoverProps} className={`item${location.pathname === '/books/finished' ? ' active' : ''}`} onMouseUp={() => history.push('/books/finished')}>
          <CheckMarkSVG />
          <span>
            Finished
          </span>
        </motion.div>
      </AnimateSharedLayout>
    </motion.div>
  );
});

export default BooksSidebar;
