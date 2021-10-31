import {action, observable} from 'mobx'
import api from '../../api/api'



class BookStore{
    @observable books = []

    @action setBooks(books) {
        this.books = books
    }
}

export default BookStore