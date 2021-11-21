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
import api from '../../api/api';
import BooksStore from './BooksStore';
import BooksSidebar from './BooksSidebar';
import Book from './Book';
import BookDetails from './BookDetails';

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
}

const Books = observer(({ bookId }:IProps) => {
  const store = useMemo(() => new BooksStore(), []);
  const [selectedIndex, setIndex] = useState(0);
  useEffect(() => {
    api('api/books').then((response) => {
      store.setBooks(response.data);
    });
  }, [store]);
  // const location = useLocation();
  return (
    <div className="Books">
      <BooksSidebar addBook={store.addBook} />
      <Scrollbars>
        <div className="content">
          <AnimateSharedLayout type="crossfade">
            {store.computedBooks.map((book, i) => (
              <Book
                setIndex={setIndex}
                bookId={bookId}
                store={store}
                book={book}
                index={i}
                isSelected={bookId === `${book.id}`}
              />
            ))}
            <AnimatePresence>
              {bookId && (
                <BookDetails book={store.books[selectedIndex]} />
              )}
            </AnimatePresence>
          </AnimateSharedLayout>

          {/* {location.pathname === '/books' && store.computedBooks.map((book, i) => (
            <Book
              store={store}
              book={book}
              index={i}
              isSelected={bookId === book.id}
            />
          ))}
          {location.pathname === '/books/finished' && store.finishedBooks.map((book, i) => (
            <Book
              store={store}
              book={book}
              index={i}
            />
          ))}
          {location.pathname === '/books/favourite' && store.favouriteBooks.map((book, i) => (
            <Book
              store={store}
              book={book}
              index={i}
            />
          ))}
          {location.pathname === '/books/unread' && store.unreadBooks.map((book, i) => (
            <Book
              store={store}
              book={book}
              index={i}
            />
          ))} */}
        </div>
      </Scrollbars>
    </div>
  );
});

export default Books;
