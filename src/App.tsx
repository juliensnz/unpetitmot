import Display from 'app/application/component/display';
import ModeSwitcher from 'app/application/component/mode-switcher';
import DisplayModel from 'app/domain/model/display';
import * as React from 'react';
import {connect} from 'react-redux';
import './App.css';
import {updateCursorPosition} from 'app/application/event/cursor';
import {State} from './index';
import stateRenderer from 'app/application/renderer/state';

interface AppStateProps {
  pixels: number[][];
}

interface AppDispatchProps {
  onUpdateCursorPosition: (x: number, y: number) => void;
  onModeChange: (mode: string) => void;
}

class App extends React.Component<AppStateProps & AppDispatchProps> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div className="App">
        <h1>Un petit mot Ç</h1>
        <Display pixels={this.props.pixels} updateCursorPosition={this.props.onUpdateCursorPosition} />
        <ModeSwitcher onModeChange={this.props.onModeChange} />
      </div>
    );
  }
}

export default connect(
  (state: State): AppStateProps => {
    const display = stateRenderer(DisplayModel.createBlack(128, 64), state.display);

    return {
      pixels: display.pixels,
    };
  },
  (dispatch: any) => {
    return {
      onUpdateCursorPosition: (x: number, y: number) => {
        dispatch(updateCursorPosition(x, y));
      },
      onModeChange: (x: number, y: number) => {
        dispatch(updateCursorPosition(x, y));
      },
    };
  }
)(App);
