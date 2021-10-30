import {observable} from 'mobx'


// interface UserStoreInterface{
//     loggedIn: boolean;
// }

class UserStore{
    // loggedIn: boolean
    constructor() {
        // this.loggedIn = true
    }

    @observable loggedIn = false

}

const user = new UserStore()
export default user