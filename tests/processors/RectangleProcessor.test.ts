import { RectangleProcessor } from '../../src/processors/RectangleProcessor.js';
import { Rectangle } from '../../src/entities/Rectangle.js';
import { Point } from '../../src/entities/Point.js';
import { warehouse } from '../../src/warehouse/Warehouse.js';

describe('RectangleProcessor', () => {
  it('should process valid rectangle', () => {
    const points = [
      new Point(0, 0),
      new Point(4, 0),
      new Point(4, 3),
      new Point(0, 3),
    ];
    const rectangle = new Rectangle('1', 'test', points, warehouse);

    expect(() => RectangleProcessor.processRectangle(rectangle)).not.toThrow();
  });

  it('should handle processing errors', () => {
    // Create a rectangle with 4 points but invalid geometry (all collinear)
    const invalidPoints = [
      new Point(0, 0),
      new Point(1, 0),
      new Point(2, 0),
      new Point(3, 0),
    ];
    const rectangle = new Rectangle('2', 'invalid', invalidPoints, warehouse);

    // The processor should handle this gracefully
    expect(() => RectangleProcessor.processRectangle(rectangle)).not.toThrow();
  });
});
