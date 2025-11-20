import { RectangleCalculator } from '../../src/calculators/RectangleCalculator';
import { TetrahedronCalculator } from '../../src/calculators/TetrahedronCalculator';
import { Point } from '../../src/entities/Point';

describe('Calculator Edge Cases', () => {
  test('Invalid inputs and degenerate cases', () => {
    const emptyPoints: Point[] = [];
    const twoPoints = [new Point(0, 0), new Point(1, 1)];
    const collinearPoints = [
      new Point(0, 0, 0),
      new Point(1, 0, 0),
      new Point(2, 0, 0),
      new Point(3, 0, 0),
    ];
    const duplicatePoints = [
      new Point(0, 0),
      new Point(0, 0),
      new Point(1, 1),
      new Point(1, 1),
    ];

    expect(RectangleCalculator.calculateArea(emptyPoints)).toBe(0);
    expect(RectangleCalculator.isRectangle(duplicatePoints)).toBe(false);
    expect(TetrahedronCalculator.calculateVolume(collinearPoints)).toBe(0);
    expect(TetrahedronCalculator.isTetrahedron(collinearPoints)).toBe(false);
  });
});
