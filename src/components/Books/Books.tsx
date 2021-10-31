import { observer } from 'mobx-react'
import React, { useEffect, useMemo, useState } from 'react'
import { ReactReader } from 'react-reader'
import { Tracing } from 'trace_events'
import { Url } from 'url'
import api from '../../api/api'
import BookStore from './BookStore'

interface BookInterface {
    book: {
        id: number,
        title: string,
        url: string,
    },
}


const Books = observer(() => {
    const store = useMemo(() => new BookStore(), [])
    useEffect(() => {
        api('api/books').then(response => {
            store.setBooks(response.data)})
    }, [store])
    return <div className="Books">
        <div>
            {console.log("@@@@@@ store.books", store.books)}
            {store.books.map(book => <Book book={book}/>)}
        </div>
    </div>
})


const Book = observer(({book}:BookInterface) => {
    const [open, setOpen] = useState(false)

    if(open) {
        return       <ReactReader
        // location={location}
        // locationChanged={locationChanged}
        url={book.url}
      />
    }


    return <div onClick={() => setOpen(true)} key={book.id} className='book'>
        <div>
            {book.title}
        </div>
        <div>
            {book.url}
        </div>
    </div>

})

export default Books
