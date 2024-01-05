let _store = null;
let _router = null;

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

  static set router(router) {
    _router = router;
  }

  static get router() {
    return _router;
  }
}

export default Global;
