/* eslint-disable max-len */
/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Modal } from '@mui/material';
import { observer } from 'mobx-react';
import React, { useMemo } from 'react';
import { ReactReader } from 'react-reader';
import { BookInterface } from '../Books/Books';
import ReaderStore from './ReaderStore';

const Reader = observer(({
  book, close, store, index, open,
}:BookInterface) => {
  // console.log('@@@@@ book', book);
  const readerStore = useMemo(() => new ReaderStore({ book, store, index }),
    [store.books[index].location]);

  return (
    <Modal
      className="read-book-modal center"
      open={open}
      onClose={() => close(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="open-book">
        <div
          className="close"
          onKeyUp={() => close(false)}
          onClick={(event) => {
            event.stopPropagation();
            close(false);
          }}
        >
          close

        </div>
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
