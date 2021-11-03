/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react';
import api from '../../api/api';
import Reader from '../Reader/Reader';
import BookStore from './BookStore';

export interface BookInterface {
    book: {
        id: number,
        title: string,
        url: string,
        coverUrl: string,
    },
    close?:any
}

const Book = observer(({ book }:BookInterface) => {
  const [open, setOpen] = useState(false);

  if (open) {
    return <Reader book={book} close={setOpen} />;
  }

  return (
    <div onClick={() => setOpen(true)} onKeyUp={() => setOpen(true)} key={book.id} className="book">
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
  const store = useMemo(() => new BookStore(), []);
  useEffect(() => {
    api('api/books').then((response) => {
      store.setBooks(response.data);
    });
  }, [store]);
  return (
    <div className="Books">
      {store.books.map((book) => <Book book={book} />)}

    </div>
  );
});

export default Books;
