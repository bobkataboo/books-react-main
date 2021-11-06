import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import api from '../../api/api';

const BookDetails = observer(({ bookId }:any) => {
  const [book, setBook] = useState(null);
  useEffect(() => {
    api(`api/books/${bookId}`).then(({ data }) => {
      setBook(data);
      console.log('@@@@ data', data);
    });
  }, []);

  if (!book) return null;

  return (
    <div className="BookDetails">
      <div
        className="book"
      >
        <div className="left">
          <div className="cover">
            <img src={book.coverUrl} alt="book cover" />
          </div>
          <div className="title center-flex">
            {book.title}
          </div>
        </div>
        <div className="right">
          <div className="progress">
            Progress: 67%
          </div>
          <div className="description">
            {book.description}
          </div>
        </div>
      </div>
    </div>
  );
});

export default BookDetails;
