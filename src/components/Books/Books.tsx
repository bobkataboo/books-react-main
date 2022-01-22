// @ts-nocheck
/* eslint-disable max-len */
/* eslint-disable global-require */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react';
import { Scrollbars } from 'rc-scrollbars';
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import { useHistory, useLocation } from 'react-router-dom';
import api from '../../api/api';
import BooksStore from './BooksStore';
import BooksSidebar from './BooksSidebar';
import Book from './Book';
import BookDetails from './BookDetails';
import Overlay from '../Shared/Overlay';

export interface BookInterface {
    index: number,
    store: BooksStore,
    book: {
        id: number,
        title: string,
        url: string,
        coverUrl: string,
        location: string,
        favourite: boolean,
        finished: boolean,
    },
    close?:any,
    open?: boolean,
    isSelected?: boolean,
    bookId?: string
}

interface IProps{
  bookId?: string
  darkMode: boolean
}

const Books = observer(({ bookId, darkMode }:IProps) => {
  const store = useMemo(() => new BooksStore(), []);
  const [selectedIndex, setIndex] = useState(0);
  const [currentPath, setCurrentPath] = useState('');
  useEffect(() => {
    api('api/books').then((response) => {
      store.setBooks(response.data);
    });
  }, [store]);
  const location = useLocation();
  const history = useHistory();
  const currentBooks = useMemo(() => {
    if (bookId) {
      if (currentPath === '/books') {
        return store.computedBooks;
      }
      if (currentPath === '/books/unread') {
        return store.unreadBooks;
      }
      if (currentPath === '/books/favourite') {
        return store.favouriteBooks;
      }
      if (currentPath === '/books/finished') {
        return store.finishedBooks;
      }
    }
    if (location.pathname === '/books') {
      return store.computedBooks;
    }
    if (location.pathname === '/books/unread') {
      return store.unreadBooks;
    }
    if (location.pathname === '/books/favourite') {
      return store.favouriteBooks;
    }
    if (location.pathname === '/books/finished') {
      return store.finishedBooks;
    }
    return '';
  }, [store, location, bookId, setCurrentPath]);
  return (
    <div className="Books">
      <BooksSidebar addBook={store.addBook} />
      <Scrollbars>
        <div className="content">
          <AnimateSharedLayout type="crossfade">
            {(location.pathname === '/books' || currentPath === '/books') && store.computedBooks.map((book, i) => (
              <Book
                setCurrentPath={setCurrentPath}
                darkMode={darkMode}
                setIndex={setIndex}
                bookId={bookId}
                store={store}
                book={book}
                index={i}
                isSelected={bookId === `${book.id}`}
              />
            ))}
            {(location.pathname === '/books/finished' || currentPath === '/books/finished') && store.finishedBooks.map((book, i) => (
              <Book
                setCurrentPath={setCurrentPath}
                darkMode={darkMode}
                setIndex={setIndex}
                bookId={bookId}
                store={store}
                book={book}
                index={i}
                isSelected={bookId === `${book.id}`}
              />
            ))}
            {(location.pathname === '/books/favourite' || currentPath === '/books/favourite') && store.favouriteBooks.map((book, i) => (
              <Book
                setCurrentPath={setCurrentPath}
                darkMode={darkMode}
                setIndex={setIndex}
                bookId={bookId}
                store={store}
                book={book}
                index={i}
                isSelected={bookId === `${book.id}`}
              />
            ))}
            {(location.pathname === '/books/unread' || currentPath === '/books/unread') && store.unreadBooks.map((book, i) => (
              <Book
                setCurrentPath={setCurrentPath}
                darkMode={darkMode}
                setIndex={setIndex}
                bookId={bookId}
                store={store}
                book={book}
                index={i}
                isSelected={bookId === `${book.id}`}
              />
            ))}
            {console.log('@@@@@ currentBooks', currentBooks)}
            <Overlay isSelected={Boolean(bookId)} redirect={false} handleClose={() => history.goBack()} />
            <AnimatePresence>
              {bookId && (
                <>
                  <BookDetails book={currentBooks[selectedIndex]} setCurrentPath={setCurrentPath} />
                </>
              )}
            </AnimatePresence>
          </AnimateSharedLayout>

        </div>
      </Scrollbars>
    </div>
  );
});

export default Books;
