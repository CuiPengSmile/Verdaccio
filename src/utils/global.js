let _store = null;

class Global {
  static setGlobal({ store }) {
    _store = store;
  }
  static set store(store) {
    _store = store;
  }

  static get store() {
    return _store;
  }
}

export default Global;
