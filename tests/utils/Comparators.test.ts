import { ShapeComparators } from '../../src/utils/Comparators.js';
import { Rectangle } from '../../src/entities/Rectangle.js';
import { Tetrahedron } from '../../src/entities/Tetrahedron.js';
import { Point } from '../../src/entities/Point.js';
import { warehouse } from '../../src/warehouse/Warehouse.js';

describe('ShapeComparators', () => {
  const rect1 = new Rectangle(
    '1',
    'Beta',
    [new Point(2, 3), new Point(2, 5), new Point(5, 5), new Point(5, 3)],
    warehouse,
  );

  const rect2 = new Rectangle(
    '2',
    'Alpha',
    [new Point(1, 1), new Point(1, 4), new Point(4, 4), new Point(4, 1)],
    warehouse,
  );

  const tetra = new Tetrahedron(
    '3',
    'Gamma',
    [
      new Point(0, 0, 0),
      new Point(2, 0, 0),
      new Point(0, 2, 0),
      new Point(0, 0, 2),
    ],
    warehouse,
  );

  test('should sort by id', () => {
    const shapes = [rect2, rect1, tetra];
    const sorted = shapes.sort(ShapeComparators.byIdFn);
    expect(sorted.map(s => s.id)).toEqual(['1', '2', '3']);
  });

  test('should sort by name', () => {
    const shapes = [rect1, rect2, tetra];
    const sorted = shapes.sort(ShapeComparators.byNameFn);
    expect(sorted.map(s => s.name)).toEqual(['Alpha', 'Beta', 'Gamma']);
  });

  test('should sort by first point X coordinate', () => {
    const shapes = [rect1, rect2];
    const sorted = shapes.sort(ShapeComparators.byFirstPointXFn);
    expect(sorted[0].points[0].x).toBe(1);
    expect(sorted[1].points[0].x).toBe(2);
  });

  test('should sort by first point Y coordinate', () => {
    const shapes = [rect1, rect2];
    const sorted = shapes.sort(ShapeComparators.byFirstPointYFn);
    expect(sorted[0].points[0].y).toBe(1);
    expect(sorted[1].points[0].y).toBe(3);
  });
});
