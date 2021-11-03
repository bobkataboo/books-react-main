/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { observer } from 'mobx-react';
import React, { useMemo } from 'react';
import { ReactReader } from 'react-reader';
import { BookInterface } from '../Books/Books';
import ReaderStore from './ReaderStore';

const Reader = observer(({
  book, close, store, index,
}:BookInterface) => {
  // console.log('@@@@@ book', book);
  const readerStore = useMemo(() => new ReaderStore({ book, store, index }),
    [store.books[index].location]);

  return (
    <div className="open-book">
      {/* {console.log('@@@@@@ index, Store', index, readerStore?.location)} */}
      <div className="close" onKeyUp={() => close(false)} onClick={() => close(false)}>close</div>
      <ReactReader
        location={readerStore.location || undefined}
        locationChanged={(location) => readerStore.setLocation(location)}
        url={book.url}
      />
    </div>
  );
});

export default Reader;
