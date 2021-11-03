import { action, computed, observable } from 'mobx';
import localStorage from '../storage/storage';

// interface UserStoreInterface{
//     loggedIn: boolean;
// }

class UserStore {
  // loggedIn: boolean
  constructor() {
    if (localStorage.get('token')) {
      this.loggedIn = true;
    }
  }

    @observable loggedIn = false

    @computed get isLoggedIn() {
      return this.loggedIn;
    }

    @action.bound setLoggedIn(value: boolean) {
      this.loggedIn = value;
    }
}

const user = new UserStore();

export default user;
