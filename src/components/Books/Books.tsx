import React, { useEffect } from 'react'
import api from '../../api/api'


const Books = () => {
    useEffect(() => {
        api('api/books')
    }, [])
    return <div className="Books">
        asdsaddsa
        {console.log("@@@@@ books rendered")}

    </div>
}

export default Books
