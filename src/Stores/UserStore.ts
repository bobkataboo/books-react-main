import {action, computed, observable} from 'mobx'
import storage from '../storage/storage'


// interface UserStoreInterface{
//     loggedIn: boolean;
// }

class UserStore{
    // loggedIn: boolean
    constructor(any?:any) { 
        if (storage.get('token')) {
            this.loggedIn = true
        }

    }
    @observable loggedIn = false
    @computed get isLoggedIn() {
        return this.loggedIn
    }

    @action.bound setLoggedIn(value: boolean) {
        this.loggedIn = value
    }
}


const user = new UserStore()

export default user