import { ShapeAnalyzer } from '../../src/processors/ShapeAnalyzer.js';
import { Rectangle } from '../../src/entities/Rectangle.js';
import { Tetrahedron } from '../../src/entities/Tetrahedron.js';
import { Point } from '../../src/entities/Point.js';
import { warehouse } from '../../src/warehouse/Warehouse.js';

describe('ShapeAnalyzer', () => {
  it('should analyze rectangle shape', () => {
    const points = [
      new Point(0, 0),
      new Point(4, 0),
      new Point(4, 3),
      new Point(0, 3),
    ];
    const rectangle = new Rectangle(
      'rect1',
      'test-rectangle',
      points,
      warehouse,
    );

    expect(() =>
      ShapeAnalyzer.analyzeShape(rectangle, 'RECTANGLE'),
    ).not.toThrow();
  });

  it('should analyze tetrahedron shape', () => {
    const vertices = [
      new Point(0, 0, 0),
      new Point(1, 0, 0),
      new Point(0, 1, 0),
      new Point(0, 0, 1),
    ];
    const tetrahedron = new Tetrahedron(
      'tetra1',
      'test-tetrahedron',
      vertices,
      warehouse,
    );

    expect(() =>
      ShapeAnalyzer.analyzeShape(tetrahedron, 'TETRAHEDRON'),
    ).not.toThrow();
  });

  it('should return rectangle analysis data', () => {
    const points = [
      new Point(0, 0),
      new Point(2, 0),
      new Point(2, 2),
      new Point(0, 2),
    ];
    const rectangle = new Rectangle('rect1', 'square', points, warehouse);

    const result = ShapeAnalyzer.analyzeRectangle(rectangle);

    expect(result).toHaveProperty('area');
    expect(result).toHaveProperty('perimeter');
    expect(result).toHaveProperty('isRectangle');
    expect(result).toHaveProperty('isSquare');
    expect(result.area).toBe(4);
    expect(result.isSquare).toBe(true);
  });
});
