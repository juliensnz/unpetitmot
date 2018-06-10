import {State} from 'app/domain/reducer/display';
import Display from 'app/domain/model/display';
import textRenderer from 'app/application/renderer/text';
import {Text} from 'app/domain/reducer/text';
import cursorRenderer from 'app/application/renderer/cursor';
// import qrcodeRenderer from 'app/application/renderer/qrcode';

const stateRenderer = (display: Display, state: State) => {
  let renderedDisplay = state.text.texts.reduce((newDisplay: Display, text: Text) => {
    return textRenderer(newDisplay, text);
  }, display);

  renderedDisplay = textRenderer(renderedDisplay, state.text.currentText);
  // const qrDisplay = qrcodeRenderer(currentDisplay, 'zfiuhaeidhsjh zugshizhdkjsh zhkdayilukzhjazb');
  if (state.text.currentText.chars.length === 0) {
    renderedDisplay = cursorRenderer(renderedDisplay, state.cursor);
  }

  return renderedDisplay;
};

export default stateRenderer;
