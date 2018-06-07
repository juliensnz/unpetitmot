import {Coordinate} from 'app/domain/model/display';

export interface Text {
  chars: number[];
  position: Coordinate;
}

export interface TextState {
  currentText: Text;
  texts: Text[];
}

const createEmptyText = (position: Coordinate): Text => ({chars: [], position});

export default (
  state: TextState = {
    currentText: {chars: [], position: {x: 0, y: 0}},
    texts: [],
  },
  action: {type: string; char: number; position: Coordinate}
) => {
  switch (action.type) {
    case 'UPDATE_CURSOR_POSITION':
      state = {
        ...state,
        currentText: createEmptyText(action.position),
        texts: state.currentText.chars.length > 0 ? [...state.texts, state.currentText] : state.texts,
      };
      break;
    case 'APPEND_CHAR':
      const concatenatedText = {
        ...state.currentText,
        chars: [...state.currentText.chars, action.char],
      };

      state = {...state, currentText: concatenatedText};

      break;
    case 'REMOVE_CHAR':
      const chars = [...state.currentText.chars];
      chars.pop();

      const slicedText = {
        ...state.currentText,
        chars,
      };

      state = {...state, currentText: slicedText};

      break;
    default:
      break;
  }

  return state;
};
