// import { State } from 'index';

// const states: State[] = [];

const undoMiddleware = (store: any) => (next: any) => (action: any) => {
  // if ('UNDO' === action.type) {
  //   states.pop();

  //   return states[states.length - 1];
  // }

  const newState = next(action);

  // states.push(store.getState());

  return newState;
};

export default undoMiddleware;
