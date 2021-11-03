/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { observer } from 'mobx-react';
import React, { useMemo } from 'react';
import { ReactReader } from 'react-reader';
import { BookInterface } from '../Books/Books';
import ReaderStore from './ReaderStore';

const Reader = observer(({ book, close }:BookInterface) => {
  const store = useMemo(() => new ReaderStore(), []);

  return (
    <div className="open-book" onKeyPress={(event) => console.log('@@@@@@ keyUp', event)}>
      <div className="close" onKeyUp={() => close(false)} onClick={() => close(false)}>close</div>
      {console.log('@@@@ boog.url', book.url)}
      <ReactReader
        location={store.location || undefined}
        locationChanged={store.setLocation}
        url={book.url}
      />
    </div>
  );
});

export default Reader;
