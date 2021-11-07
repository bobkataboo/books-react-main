import { action, observable } from 'mobx';
import api, { apiUpdate } from '../../api/api';

class BookDetailsStore {
  constructor(bookId) {
    api(`api/books/${bookId}`).then(({ data }) => {
      this.book = data;
    });
  }

    @observable book

    @observable open = false

    @action.bound setOpen(value:boolean) {
      this.open = value;
    }

    @action.bound setBook(book) {
      this.book = book;
    }

    @action.bound updateBook(bookId, location) {
      apiUpdate(`api/books/${bookId}`, { location }).then((response) => {
        this.book = response.data;
      });
    }

    @action.bound toggleFinishBook(book) {
      const body = {
        finished: !book.finished,
      };
      apiUpdate(`api/books/${book.id}`, body).then(({ data }) => {
        this.book = data;
      });
    }

    @action.bound toggleFavouriteBook(book) {
      const body = {
        favourite: !book.favourite,
      };
      apiUpdate(`api/books/${book.id}`, body).then(({ data }) => {
        this.book = data;
      });
    }
}

export default BookDetailsStore;
