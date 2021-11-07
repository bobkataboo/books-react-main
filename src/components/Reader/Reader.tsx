/* eslint-disable max-len */
/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Button, Modal } from '@mui/material';
import { observer } from 'mobx-react';
import React, { useMemo } from 'react';
import { ReactReader } from 'react-reader';
import BookDetailsStore from '../Books/BookDetailsStore';
import BooksStore from '../Books/BooksStore';
import ReaderStore from './ReaderStore';

 interface ReaderInterface {
  index: number,
  store?: BooksStore,
  bookDetailsStore?: BookDetailsStore,
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
}

const Reader = observer(({
  book, store, index, close, open, bookDetailsStore,
}:ReaderInterface) => {
  const readerStore = useMemo(() => new ReaderStore({
    book, store, index, bookDetailsStore,
  }),
  []);

  return (
    <Modal
      className="read-book-modal center"
      open={open}
      onClose={() => close(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="open-book">
        <Button
          id="basic-button"
          aria-controls="basic-menu"
          aria-haspopup="true"
          className="close"
          onKeyUp={() => close(false)}
          onClick={(event) => {
            event.stopPropagation();
            close(false);
          }}
        >
          close

        </Button>
        <ReactReader
          location={readerStore.location || undefined}
          locationChanged={(location) => readerStore.setLocation(location)}
          url={book.url}
        />
      </div>
    </Modal>
  );
});

export default Reader;
