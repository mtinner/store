import {Action} from "./actions";

export class Store {
  private subscribers: Function[];
  private reducers: { [key: string]: Function };
  private state: { [key: string]: any };

  constructor(reducers = {}, initialState = {}) {
    this.subscribers = [];
    this.reducers = reducers;
    this.state = this.reduce(initialState, {} as Action);
  }

  get value() {
    return this.state;
  }

  subscribe(fn: Function) {
    this.subscribers = [...this.subscribers, fn];
    this.notify();
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== fn)
    }
  }

  private notify() {
    this.subscribers.forEach(fn => fn(this.state));
  }

  dispatch(action: Action) {
    this.state = this.reduce(this.state, action);
    this.notify();
  }

  reduce(state, action: Action) {
    const newState = {};
    for (const prop in this.reducers) {
      newState[prop] = this.reducers[prop](state[prop], action)
    }

    return newState;
  }
}


