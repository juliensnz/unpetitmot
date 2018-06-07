const firebaseMiddleware = (database: any) => (store: any) => (next: any) => (action: any) => {
  const newState = next(action);

  database.ref(`users/${'maman'}/display`).set(store.getState().display);

  return newState;
};

export default firebaseMiddleware;
