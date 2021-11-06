/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import { Modal } from '@mui/material';
import { Formik } from 'formik';
import { Scrollbars } from 'rc-scrollbars';
import api, { post, searchBooks } from '../../api/api';
import Reader from '../Reader/Reader';
import BooksStore from './BooksStore';
import user from '../../Stores/UserStore';

// const googleApiKey = 'AIzaSyA_pdEMzoFPrDEZhl8KF5D4MJ1EWKmw5Fw';

interface NewBookInterface{
  // eslint-disable-next-line no-unused-vars
  addBook: (book:any) => void,
}

const NewBook = ({ addBook }:NewBookInterface) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div onClick={() => setOpen(true)}>Add book..</div>
      <Modal
        className="new-book-modal center"
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modal-body">
          <div className="inner">
            <Formik
              initialValues={{ bookTitle: '', bookUrl: '' }}
              onSubmit={(values, { setSubmitting }) => {
                searchBooks(values.bookTitle).then((data) => {
                  if (data) {
                    const { items } = data.data;
                    const item = items[0];
                    if (!item) return;
                    const { volumeInfo } = item;
                    const {
                      title, subtitle, authors, description, imageLinks,
                    } = volumeInfo;
                    post('api/books', {
                      title,
                      subtitle,
                      author: authors[0],
                      url: values.bookUrl,
                      user: user.id,
                      description,
                      coverUrl: imageLinks.thumbnail,
                    }).then((book) => {
                      addBook(book);
                    });
                  }
                });
                setTimeout(() => {
                  // alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }, 400);
              }}
            >
              {({
                values,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
              }) => (
                <form onSubmit={handleSubmit}>
                  <div className="input p">
                    <input
                      className="p"
                      type="text"
                      name="bookTitle"
                      placeholder="Book Title"
                      onChange={handleChange}
                      // onChange={(event) => {
                      //   handleChange(event);
                      // }}
                      onBlur={handleBlur}
                      value={values.bookTitle}
                    />
                  </div>
                  <div className="input p">
                    <input
                      className="p"
                      type="text"
                      name="bookUrl"
                      placeholder="Book Url"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.bookUrl}
                    />
                  </div>
                  <button
                    type="submit"
                    className="submit item hand"
                    disabled={isSubmitting}
                  >
                    Submit
                  </button>
                </form>
              )}
            </Formik>
          </div>

        </div>
      </Modal>
    </>
  );
};
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

const Book = observer(({
  book, store, index,
}:BookInterface) => {
  const [open, setOpen] = useState(false);
  const history = useHistory();

  if (open) {
    return <Reader index={index} store={store} book={book} close={setOpen} />;
  }

  return (
    <div
      onClick={() => {
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
        <div
          className="hand"
          // onKeyDown={(event) => event.stopPropagation()}
          onClick={(event) => {
            event.stopPropagation();
            history.push(`/books/${book.id}`);
          }}
        >
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
      <div className="sidebar">
        <div className="item p2">
          <NewBook addBook={store.addBook} />
        </div>
        <div className="item p2">
          Unread books
        </div>
        <div className="item p2">
          Favourite
        </div>
        <div className="item p2">
          Finished
        </div>
      </div>
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
