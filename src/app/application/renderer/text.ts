import Display, {Coordinate, Pixel} from 'app/domain/model/display';
import pico from 'app/application/font/pico';
import {Text} from 'app/domain/reducer/text';

const drawChar = (display: Display, char: number, position: Coordinate): Display => {
  const glyph = pico[char];
  if (undefined === glyph) {
    return display;
  }

  glyph.forEach((line: Pixel[], y: number) => {
    line.forEach((pixel: Pixel, x: number) => {
      display = display.drawPixel({x: x + position.x, y: y + position.y}, pixel);
    });
  });

  return display;
};

const textRenderer = (display: Display, text: Text) => {
  return text.chars.reduce((result: Display, char: number, index: number) => {
    return drawChar(result, char, {x: text.position.x + index * 4, y: text.position.y});
  }, display);
};

export default textRenderer;
