import { RectangleCalculator } from '../../src/calculators/RectangleCalculator';
import { Point } from '../../src/entities/Point';

describe('RectangleCalculator', () => {
  const validRectanglePoints = [
    new Point(0, 0),
    new Point(0, 3),
    new Point(4, 3),
    new Point(4, 0),
  ];

  const squarePoints = [
    new Point(0, 0),
    new Point(0, 5),
    new Point(5, 5),
    new Point(5, 0),
  ];

  const nonRectanglePoints = [
    new Point(0, 0),
    new Point(0, 3),
    new Point(4, 4),
    new Point(4, 0),
  ];

  test('Basic calculations and shape validation', () => {
    expect(RectangleCalculator.calculateArea(validRectanglePoints)).toBe(12);
    expect(RectangleCalculator.calculateArea(squarePoints)).toBe(25);
    expect(RectangleCalculator.isRectangle(validRectanglePoints)).toBe(true);
    expect(RectangleCalculator.isRectangle(nonRectanglePoints)).toBe(false);
    expect(RectangleCalculator.isSquare(squarePoints)).toBe(true);
    expect(RectangleCalculator.isSquare(validRectanglePoints)).toBe(false);
    expect(RectangleCalculator.isConvex(validRectanglePoints)).toBe(true);
  });

  test('Special quadrilateral types and perimeter', () => {
    const rhombusPoints = [
      new Point(0, 0),
      new Point(2, 3),
      new Point(4, 0),
      new Point(2, -3),
    ];
    const trapezoidPoints = [
      new Point(0, 0),
      new Point(0, 2),
      new Point(3, 2),
      new Point(4, 0),
    ];

    expect(RectangleCalculator.isRhombus(rhombusPoints)).toBe(true);
    expect(RectangleCalculator.isRhombus(validRectanglePoints)).toBe(false);
    expect(RectangleCalculator.isTrapezoid(trapezoidPoints)).toBe(true);
    expect(RectangleCalculator.isTrapezoid(validRectanglePoints)).toBe(true);
    expect(RectangleCalculator.calculatePerimeter(validRectanglePoints)).toBe(
      14,
    );
  });

  test('Edge cases and invalid inputs', () => {
    const wrongPoints = [new Point(0, 0), new Point(1, 0), new Point(1, 1)];
    const selfIntersectingPoints = [
      new Point(0, 0),
      new Point(2, 2),
      new Point(2, 0),
      new Point(0, 2),
    ];
    const nonConvexPoints = [
      new Point(0, 0),
      new Point(2, 2),
      new Point(2, 0),
      new Point(0, 2),
    ];

    expect(RectangleCalculator.calculateArea(wrongPoints)).toBe(0);
    expect(RectangleCalculator.isRectangle(wrongPoints)).toBe(false);
    expect(RectangleCalculator.isRectangle(selfIntersectingPoints)).toBe(false);
    expect(RectangleCalculator.isConvex(selfIntersectingPoints)).toBe(false);
    expect(RectangleCalculator.isTrapezoid(nonConvexPoints)).toBe(false);
  });
});
