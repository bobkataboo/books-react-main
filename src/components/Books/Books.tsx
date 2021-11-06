/* eslint-disable max-len */
/* eslint-disable global-require */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useMemo } from 'react';
import { observer } from 'mobx-react';
import { Scrollbars } from 'rc-scrollbars';
import api from '../../api/api';
import BooksStore from './BooksStore';
import BooksSidebar from './BooksSidebar';
import Book from './Book';

export interface BookInterface {
    index: number,
    store: BooksStore,
    book: {
        id: number,
        title: string,
        url: string,
        coverUrl: string,
        location: string,
    },
    close?:any,
    open?: boolean,
}

const Books = observer(() => {
  const store = useMemo(() => new BooksStore(), []);
  useEffect(() => {
    api('api/books').then((response) => {
      store.setBooks(response.data);
    });
  }, [store]);
  return (
    <div className="Books">
      <BooksSidebar addBook={store.addBook} />
      <Scrollbars>
        <div className="content">
          {store.computedBooks.map((book, i) => (
            <Book
              store={store}
              book={book}
              index={i}
            />
          ))}
        </div>
      </Scrollbars>
    </div>
  );
});

export default Books;
