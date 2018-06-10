import {Coordinate} from 'app/domain/model/display';

export interface CursorState {
  x: number;
  y: number;
}

export default (
  state: CursorState = {
    x: 1,
    y: 1,
  },
  action: {type: string; position: Coordinate}
) => {
  switch (action.type) {
    case 'UPDATE_CURSOR_POSITION':
      console.log(action.position);
      state = action.position;
      break;
    default:
      break;
  }

  return state;
};
