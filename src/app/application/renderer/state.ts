import {State} from 'app/domain/reducer/display';
import Display from 'app/domain/model/display';
import textRenderer from 'app/application/renderer/text';
import {Text} from 'app/domain/reducer/text';

const stateRenderer = (display: Display, state: State) => {
  const textDisplay = state.text.texts.reduce((newDisplay: Display, text: Text) => {
    return textRenderer(newDisplay, text);
  }, display);

  const currentDisplay = textRenderer(textDisplay, state.text.currentText);

  return currentDisplay;
};

export default stateRenderer;
