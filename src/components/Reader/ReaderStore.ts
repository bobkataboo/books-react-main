import { action, observable } from 'mobx';
import BookDetailsStore from '../Books/BookDetailsStore';
// import { apiUpdate } from '../../api/api';
import BooksStore from '../Books/BooksStore';

interface SetLocationInterface{

  base: string
  startCfi: string
}

class ReaderStore {
  bookId: number

  index: number

  booksStore: BooksStore

  bookDetailsStore: BookDetailsStore

  // startCfi:

  // location: string|number

  constructor({
    book, store, index, bookDetailsStore,
  }) {
    this.bookId = book.id;
    this.location = book.location;
    this.booksStore = store;
    this.bookDetailsStore = bookDetailsStore;
    this.index = index;
  }

  @observable location:string

  @action.bound setLocation(location):SetLocationInterface {
    console.log('@@@@@ location', location);
    this.location = location.startCfi;
    if (this.booksStore) {
      this.booksStore.updateBook(this.bookId, this.location, this.index);
    }
    if (this.bookDetailsStore) {
      this.bookDetailsStore.updateBook(this.bookId, this.location);
    }
    return null;
  }
}

export default ReaderStore;
