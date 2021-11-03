import { action, observable } from 'mobx';
// import { apiUpdate } from '../../api/api';
import BooksStore from '../Books/BooksStore';

class ReaderStore {
  bookId: number

  index: number

  booksStore: BooksStore

  constructor({ book, store, index }) {
    this.bookId = book.id;
    this.location = book.location;
    this.booksStore = store;
    this.index = index;
  }

  @observable location:string|number

  @action.bound setLocation(location:string | number) {
    this.location = location;
    this.booksStore.updateBook(this.bookId, location, this.index);
  }
}

export default ReaderStore;
