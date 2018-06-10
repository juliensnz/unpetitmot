import Display, {Coordinate, Pixel} from 'app/domain/model/display';
import pico from 'app/application/font/pico';
import {Text} from 'app/domain/reducer/text';

const drawChar = (display: Display, char: number, position: Coordinate, size: number): Display => {
  const glyph = pico[char];
  if (undefined === glyph) {
    return display;
  }

  glyph.forEach((line: Pixel[], y: number) => {
    line.forEach((pixel: Pixel, x: number) => {
      display = display.drawPixel({x: x * 2 + position.x, y: y * 2 + position.y}, pixel);
      display = display.drawPixel({x: x * 2 + position.x + 1, y: y * 2 + position.y}, pixel);
      display = display.drawPixel({x: x * 2 + position.x, y: y * 2 + position.y + 1}, pixel);
      display = display.drawPixel({x: x * 2 + position.x + 1, y: y * 2 + position.y + 1}, pixel);
    });
  });

  return display;
};

const textRenderer = (display: Display, text: Text) => {
  const size = 2;
  const charWidth = 4 * size;
  const charHeight = 5 * size;
  const charMiddle = Math.round((charHeight - 1) / 2);

  return text.chars.reduce((result: Display, char: number, index: number) => {
    return drawChar(result, char, {x: text.position.x + index * charWidth, y: text.position.y - charMiddle}, size);
  }, display);
};

export default textRenderer;
