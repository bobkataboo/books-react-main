import { action, computed, observable } from 'mobx';
import { apiUpdate } from '../../api/api';

class BooksStore {
    @observable books = [];

    @action setBooks(books) {
      this.books = books;
    }

    @action.bound addBook(book) {
      console.log('@@@@@@ book', book);
      this.books.push(book.data);
      console.log('@@@@ this.books', this.books);
    }

    @computed get computedBooks() {
      return this.books;
    }

    @action.bound updateBook(bookId, location, index) {
      apiUpdate(`api/books/${bookId}`, { location }).then((response) => {
        this.books[index] = response.data;
      });
    }
}

export default BooksStore;
