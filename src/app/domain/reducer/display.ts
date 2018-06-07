import cursor, {CursorState} from 'app/domain/reducer/cursor';
import text, {TextState} from 'app/domain/reducer/text';
import {combineReducers} from 'redux';

export interface State {
  cursor: CursorState;
  text: TextState;
}

export default combineReducers({
  cursor,
  text,
});
