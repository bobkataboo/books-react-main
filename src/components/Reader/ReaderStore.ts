import { action, observable } from 'mobx';

class ReaderStore {
    @observable location = ''

    @action.bound setLocation(location:string) {
      this.location = location;
    }
}

export default ReaderStore;
