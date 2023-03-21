class Observer {
  constructor() {
    this.observers = [];
  }

  subscribe(func) {
    this.observers.push(func);
  }

  unSubscribe(func) {
    this.observers = this.observers.filter((observer) => observer !== func);
  }
  notify(data) {
    this.observers.forEach((observer) => observer(data));
  }
}

export default new Observer();
