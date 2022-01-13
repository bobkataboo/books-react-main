/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// import { Modal } from '@mui/material';
// import { Formik } from 'formik';
import { Modal } from '@mui/material';
import { Formik } from 'formik';
import React, { useCallback, useState } from 'react';
import { post, searchBooks } from '../../api/api';
// import { post, searchBooks } from '../../api/api';
import { ReactComponent as AddBookSVG } from '../../img/add-book.svg';
import user from '../../Stores/UserStore';
import Overlay from '../Shared/Overlay';

// interface NewBookInterface{
//     // eslint-disable-next-line no-unused-vars
//     addBook: (book:any) => void,
//   }

const NewBookModal = () => {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <div className="item" onClick={() => setOpen(true)}>
        <Overlay isSelected={open} redirect={false} handleClose={close} />
        <AddBookSVG />
        <div>Add book..</div>
      </div>
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
                    }).then(() => {
                      // addBook(book);
                    });
                  }
                });
                setTimeout(() => {
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
              }) => (
                <form onSubmit={handleSubmit}>
                  <div className="input p">
                    <input
                        // eslint-disable-next-line jsx-a11y/no-autofocus
                      autoFocus
                      className="p"
                      type="text"
                      name="bookTitle"
                      placeholder="Book Title"
                      onChange={handleChange}
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

export default NewBookModal;
