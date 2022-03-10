export class StorageWrapper {
  constructor(type) {
    this.store = window[`${type}Storage`];
    this.isSupported = typeof Storage === "function";
  }

  set(key, value) {
    this.store.setItem(key, JSON.stringify(value));
  }

  get(key) {
    return JSON.parse(this.store.getItem(key));
  }

  remove(key) {
    this.store.removeItem(key);
  }

  empty() {
    this.store.clear();
  }
}