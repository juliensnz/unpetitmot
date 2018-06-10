import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Pixel} from 'app/domain/model/display';

interface DisplayProps {
  pixels: Pixel[][];
  updateCursorPosition: (x: number, y: number) => void;
}

export default class Display extends React.Component<DisplayProps, {}> {
  private el: any;
  private width = 128;
  private height = 64;
  private scale = 4;

  constructor(props: DisplayProps) {
    super(props);

    this.el = null;
  }

  public componentDidMount() {
    this.el = ReactDOM.findDOMNode(this);
    const mainContext = this.el.getContext('2d');
    mainContext.imageSmoothingEnabled = false;
    const canvasWidth = this.el.width;
    const canvasHeight = this.el.height;
    mainContext.fillRect(0, 0, canvasWidth, canvasHeight);
    mainContext.scale(4, 4);
  }

  public componentDidUpdate() {
    const mainContext = this.el.getContext('2d');
    const canvasWidth = this.el.width;
    const canvasHeight = this.el.height;
    mainContext.fillStyle = '#000000';
    mainContext.fillRect(0, 0, canvasWidth, canvasHeight);
    mainContext.fillStyle = '#ffffff';

    this.props.pixels.forEach((line: number[], y: number) => {
      line.forEach((pixel: number, x: number) => {
        if (pixel === Pixel.On) {
          mainContext.fillRect(x, y, 1, 1);
        }
      });
    });
  }

  public render() {
    return (
      <canvas
        className="display"
        onClick={this.updateCursorPosition()}
        width={this.width * this.scale}
        height={this.height * this.scale}
      />
    );
  }

  private updateCursorPosition(): any {
    return (event: any): void => {
      const x = Math.round((event.clientX - event.target.offsetLeft) / this.scale) - 1;
      const y = Math.round((event.clientY - event.target.offsetTop) / this.scale) - 1;

      this.props.updateCursorPosition(x, y);
    };
  }
}
