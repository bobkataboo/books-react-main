/* eslint-disable max-len */
/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Button, Modal } from '@mui/material';
import { observer } from 'mobx-react';
import React, {
  useEffect, useMemo, useRef, useState,
} from 'react';
// import { ReactReader } from 'react-reader';
import {
  EpubViewer,
  // ReactEpubViewer,
} from 'react-epub-viewer';
import BookDetailsStore from '../Books/BookDetailsStore';
import BooksStore from '../Books/BooksStore';
import ReaderStore from './ReaderStore';
import { ReactComponent as LeftArrow } from '../../img/right.svg';
import { ReactComponent as RightArrow } from '../../img/left.svg';

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
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    setFirstRender(false);
  }, []);
  const viewerRef = useRef(null);
  const readerStore = useMemo(() => new ReaderStore({
    book, store, index, bookDetailsStore,
  }),
  []);
  const [rendition, setRendition] = useState(null);

  const onRenditionChanged = (rend) => setRendition(rend);

  useEffect(() => {
    if (!rendition) return;
    const targetCFI = readerStore.location;
    rendition.display(targetCFI);
  }, [rendition]);

  const reader = useMemo(() => (
    <EpubViewer
      style={{ width: '100%', height: '100%', padding: '5%' }}
      url={book.url}
      ref={viewerRef}
      pageChanged={(page) => {
        readerStore.setLocation(page);
      }}
      rendtionChanged={(rend) => {
        if (firstRender) { onRenditionChanged(rend); }
      }}
    />
  ), []);

  return (
    <Modal
      className="read-book-modal center"
      open={open}
      onClose={() => close(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"

    >
      <div
        className="open-book"
      >
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
        <Button
          style={{ position: 'absolute', left: '-8px' }}
          id="basic-button"
          aria-controls="basic-menu"
          aria-haspopup="true"
          className="left"
          onKeyUp={() => close(false)}
          onClick={(event) => {
            event.stopPropagation();
            viewerRef.current.prevPage();
          }}
        >
          <RightArrow />

        </Button>
        <Button
          style={{ position: 'absolute', right: '-8px' }}
          id="basic-button"
          aria-controls="basic-menu"
          aria-haspopup="true"
          className="right"
          onKeyUp={() => close(false)}
          onClick={(event) => {
            event.stopPropagation();
            viewerRef.current.nextPage();
          }}
        >
          <LeftArrow />

        </Button>
        {reader}
      </div>
    </Modal>
  );
});

export default Reader;
