import { action, observable } from 'mobx';
import BookDetailsStore from '../Books/BookDetailsStore';
// import { apiUpdate } from '../../api/api';
import BooksStore from '../Books/BooksStore';

class ReaderStore {
  bookId: number

  index: number

  booksStore: BooksStore

  bookDetailsStore: BookDetailsStore

  constructor({
    book, store, index, bookDetailsStore,
  }) {
    this.bookId = book.id;
    this.location = book.location;
    this.booksStore = store;
    this.bookDetailsStore = bookDetailsStore;
    this.index = index;
  }

  @observable location:string|number

  @action.bound setLocation(location:string | number) {
    this.location = location;
    if (this.booksStore) {
      this.booksStore.updateBook(this.bookId, location, this.index);
    }
    if (this.bookDetailsStore) {
      this.bookDetailsStore.updateBook(this.bookId, location);
    }
  }
}

export default ReaderStore;
