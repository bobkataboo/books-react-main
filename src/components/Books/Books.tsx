/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react';
import api from '../../api/api';
import Reader from '../Reader/Reader';
import BooksStore from './BooksStore';

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
}

const Book = observer(({ book, store, index }:BookInterface) => {
  const [open, setOpen] = useState(false);

  if (open) {
    return <Reader index={index} store={store} book={book} close={setOpen} />;
  }

  return (
    <div
      onClick={() => {
        // console.log('!!!!!! book location onClick        ', book.location);
        setOpen(true);
      }}
      onKeyUp={() => setOpen(true)}
      key={book.id}
      className="book"
    >
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
        <div className="hand" onKeyDown={(event) => event.stopPropagation()} onClick={(event) => event.stopPropagation()}>
          Details
        </div>
        <div className="grow" />
        <div className="hand">
          Read
        </div>
      </div>
    </div>
  );
});

const Books = observer(() => {
  const store = useMemo(() => new BooksStore(), []);
  useEffect(() => {
    api('api/books').then((response) => {
      store.setBooks(response.data);
    });
  }, [store]);
  return (
    <div className="Books">
      {store.computedBooks.map((book, i) => <Book store={store} book={book} index={i} />)}

    </div>
  );
});

export default Books;
