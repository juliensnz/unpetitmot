import Display from 'app/application/component/display';
import DisplayModel from 'app/domain/model/display';
import * as React from 'react';
import { connect } from 'react-redux';
import './App.css';
import { updateCursorPosition } from 'app/application/event/cursor';
import { State } from './index';
import stateRenderer from 'app/application/renderer/state';

interface AppStateProps {
  pixels: number[][]
}

interface AppDispatchProps {
  updateCursorPosition: (x: number, y: number) => void
}

class App extends React.Component<AppStateProps & AppDispatchProps> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div className="App">
        <Display pixels={this.props.pixels} updateCursorPosition={this.props.updateCursorPosition} />
      </div>
    );
  }
}

export default connect((state: State): AppStateProps => {
  const display = stateRenderer(DisplayModel.createBlack(128, 64), state.display);

  return {
    // pixels: textRenderer(display, {x: 1, y: 1}, '$').pixels
    // pixels: textRenderer(display, {x: 1, y: 1}, ' !"#$%&\'()*+,-./0123456789:;<=>?@abcdefghijklmnopqrstuvwxyz[\\]^_`ABCDEFGHIJKLMNOPQRSTUVWXYZ{|}~').pixels
    // pixels: textRenderer(display, { x: 1, y: 1 }, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~').pixels
    pixels: display.pixels
    // pixels: textRenderer(display, {x, y}, 'A').pixels
    // pixels: textRenderer(display, {x: 0, y: 0}, ' !"#$%&\'').pixels
  };
},
  (dispatch: any) => {
    return {
      updateCursorPosition: (x: number, y: number) => {
        dispatch(updateCursorPosition(x, y));
      }
    };
  })(App);
