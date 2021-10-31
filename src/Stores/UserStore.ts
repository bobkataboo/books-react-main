import {action, observable} from 'mobx'
import storage from '../storage/storage'


// interface UserStoreInterface{
//     loggedIn: boolean;
// }

class UserStore{
    // loggedIn: boolean
    constructor() { 
        if (storage.get('token')) {
            this.loggedIn = true
        }
    }

    @action.bound setLoggedIn(value: boolean) {
        this.loggedIn = value
    }

    @observable loggedIn = false

}

const user = new UserStore()
export default user