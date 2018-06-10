export enum Pixel {
  On = 1,
  Off = 0,
}

export interface Coordinate {
  x: number;
  y: number;
}

export default class Display {
  public static createBlack(width: number, height: number): Display {
    const pixels: any = [];
    for (let y = 0; y < height; y++) {
      pixels[y] = [];
      for (let x = 0; x < width; x++) {
        pixels[y].push(0);
      }
    }

    return new Display(pixels);
  }

  public readonly pixels: Pixel[][];

  private constructor(pixels: Pixel[][]) {
    this.pixels = pixels;
  }

  public drawPixel(position: Coordinate, pixel: Pixel): Display {
    if (Pixel.Off === pixel) {
      return this;
    }
    if (position.y < 0 || position.x < 0) {
      return this;
    }

    const pixels = [...this.pixels];
    if (position.y >= pixels.length) {
      return this;
    }

    if (position.x >= pixels[position.y].length) {
      return this;
    }

    pixels[position.y][position.x] = pixel;

    return new Display(pixels);
  }
}
