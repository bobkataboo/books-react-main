import { action, computed, observable } from 'mobx';
import { parseJwt } from '../functions/functions';
import localStorage from '../storage/storage';

// interface UserStoreInterface{
//     loggedIn: boolean;
// }

class UserStore {
  // loggedIn: boolean
  constructor() {
    if (localStorage.get('token')) {
      this.loggedIn = true;
      this.user = parseJwt(localStorage.get('token'));
      this.id = this.user.user_id;
    }
  }

    @observable loggedIn = false

    @observable user = {
      user_id: 0,
    }

    @observable id = 0

    @computed get isLoggedIn() {
      return this.loggedIn;
    }

    // eslint-disable-next-line camelcase
    @action.bound setLoggedIn(value: boolean, user_id?: number) {
      // eslint-disable-next-line camelcase
      this.id = user_id;
      this.loggedIn = value;
    }
}

const user = new UserStore();

export default user;
