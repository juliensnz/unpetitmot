import {applyMiddleware, createStore, Store} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import firebaseMiddleware from 'app/infrastructure/middleware/firebase';
declare module 'redux' {
  export type GenericStoreEnhancer = any;
}

export default (debug: boolean = true, firebase: any) => (reducer: any): Store<any> => {
  return createStore(
    reducer,
    true === debug
      ? composeWithDevTools(applyMiddleware(thunkMiddleware, firebaseMiddleware(firebase.database())))
      : applyMiddleware(thunkMiddleware, firebaseMiddleware(firebase.database()))
  );
};
