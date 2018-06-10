import createStore from 'app/infrastructure/store';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import './index.css';
import {combineReducers} from 'redux';
import displayReducer, {State as DisplayState} from 'app/domain/reducer/display';
import * as firebase from 'firebase';
import firebaseConfig from 'config/firebase';

export interface State {
  display: DisplayState;
}

firebase.initializeApp(firebaseConfig);

const store = createStore(true, firebase)(
  combineReducers({
    display: displayReducer,
  })
);

document.addEventListener(
  'keydown',
  event => {
    console.log(event);
    if (8 === event.keyCode) {
      store.dispatch({type: 'REMOVE_CHAR'});
    } else if (event.keyCode === 90 && event.metaKey) {
      store.dispatch({type: 'UNDO'});
    } else if (event.key.length === 1) {
      store.dispatch({type: 'APPEND_CHAR', char: event.key.charCodeAt(0)});
    }
  },
  false
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
