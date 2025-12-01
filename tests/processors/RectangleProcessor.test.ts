import { RectangleProcessor } from '../../src/processors/RectangleProcessor.js';
import { Rectangle } from '../../src/entities/Rectangle.js';
import { Point } from '../../src/entities/Point.js';

describe('RectangleProcessor', () => {
  it('should process valid rectangle', () => {
    const points = [
      new Point(0, 0),
      new Point(4, 0),
      new Point(4, 3),
      new Point(0, 3),
    ];
    const rectangle = new Rectangle('1', 'test', points);

    expect(() => RectangleProcessor.processRectangle(rectangle)).not.toThrow();
  });

  it('should handle processing errors', () => {
    const invalidPoints = [new Point(0, 0)];
    const rectangle = new Rectangle('2', 'invalid', invalidPoints);

    expect(() => RectangleProcessor.processRectangle(rectangle)).toThrow();
  });
});
