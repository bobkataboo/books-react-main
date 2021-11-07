/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import { action, computed, observable } from 'mobx';
import { apiUpdate } from '../../api/api';

class BooksStore {
    @observable books = [];

    @computed get computedBooks() {
      return this.books;
    }

    @computed get finishedBooks() {
      return this.books.filter((book) => book.finished);
    }

    @computed get unreadBooks() {
      return this.books.filter((book) => !book.finished);
    }

    @computed get favouriteBooks() {
      return this.books.filter((book) => book.favourite);
    }

    @action.bound toggleFavouriteBook(book) {
      const body = {
        favourite: !book.favourite,
      };
      apiUpdate(`api/books/${book.id}`, body).then(({ data }) => {
        for (const i in this.books) {
          const oldBook = this.books[i];
          if (oldBook.id === data.id) {
            this.books[i] = data;
          }
        }
      });
    }

    @action.bound toggleFinishBook(book) {
      const body = {
        finished: !book.finished,
      };
      apiUpdate(`api/books/${book.id}`, body).then(({ data }) => {
        for (const i in this.books) {
          const oldBook = this.books[i];
          if (oldBook.id === data.id) {
            this.books[i] = data;
          }
        }
      });
    }

    @action setBooks(books) {
      this.books = books;
    }

    @action.bound addBook(book) {
      this.books.push(book.data);
    }

    @action deleteBook(book) {
      this.books = this.books.filter((item) => book.id !== item.id);
    }

    @action.bound updateBook(bookId, location, index) {
      apiUpdate(`api/books/${bookId}`, { location }).then((response) => {
        this.books[index] = response.data;
      });
    }
}

export default BooksStore;
