export const updateCursorPosition = (x: number, y: number) => (dispatch: any) => {
  dispatch({type: 'UPDATE_CURSOR_POSITION', position: {x, y}});
};
