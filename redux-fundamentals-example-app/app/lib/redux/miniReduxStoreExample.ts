function createStore<S>(reducer: Reducer<S>, preloadedState: S): Store<S> {
  let state = preloadedState;
  const listeners: (() => void)[] = [];

  function getState() {
    return state;
  }

  function subscribe(listener: () => void) {
    listeners.push(listener);
    return function unsubscribe() {
      const index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    };
  }

  function dispatch(action: Action): void {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  }

  dispatch({ type: "@@redux/INIT" });

  return { dispatch, subscribe, getState };
}

/* Types */
type Action = {
  type: string;
  // Add any other properties your actions may have
};

type Reducer<S> = (state: S, action: Action) => S;

type Unsubscribe = () => void;

type Store<S> = {
  getState: () => S;
  subscribe: (listener: () => void) => Unsubscribe;
  dispatch: (action: Action) => void;
};
