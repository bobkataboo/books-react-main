import { action, observable } from 'mobx';

class BookStore {
    @observable books = []

    @action setBooks(books) {
      this.books = books;
    }
}

export default BookStore;
