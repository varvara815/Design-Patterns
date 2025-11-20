import { Point } from '../../src/entities/Point';
import { Rectangle } from '../../src/entities/Rectangle';
import { Tetrahedron } from '../../src/entities/Tetrahedron';
import { Shape } from '../../src/entities/Shape';

describe('Point', () => {
  test('Point creation and methods', () => {
    const point = new Point(1, 2);
    const point1 = new Point(1, 2, 3);
    const point2 = new Point(1, 2, 3);
    const point3 = new Point(4, 5, 6);

    expect(point.x).toBe(1);
    expect(point.y).toBe(2);
    expect(point.z).toBe(0);
    expect(point1.equals(point2)).toBe(true);
    expect(point1.equals(point3)).toBe(false);
    expect(point1.toString()).toBe('Point(1, 2, 3)');
  });
});

describe('Rectangle', () => {
  test('Rectangle creation and methods', () => {
    const points = [
      new Point(0, 0),
      new Point(0, 1),
      new Point(1, 1),
      new Point(1, 0),
    ];
    const rectangle = new Rectangle('1', 'Test', points);
    const returnedPoints = rectangle.getPoints();

    expect(rectangle.id).toBe('1');
    expect(rectangle.name).toBe('Test');
    expect(rectangle.points).toHaveLength(4);
    expect(returnedPoints).toHaveLength(4);
    expect(returnedPoints).not.toBe(points);
    expect(rectangle.toString()).toBe(
      'Rectangle(id: 1, name: Test, points: 4)',
    );
  });
});

describe('Tetrahedron', () => {
  test('Tetrahedron creation and methods', () => {
    const vertices = [
      new Point(0, 0, 0),
      new Point(1, 0, 0),
      new Point(0, 1, 0),
      new Point(0, 0, 1),
    ];
    const tetrahedron = new Tetrahedron('1', 'Test', vertices);
    const returnedVertices = tetrahedron.getVertices();

    expect(tetrahedron.id).toBe('1');
    expect(tetrahedron.name).toBe('Test');
    expect(tetrahedron.vertices).toHaveLength(4);
    expect(returnedVertices).toHaveLength(4);
    expect(returnedVertices).not.toBe(vertices);
    expect(tetrahedron.toString()).toBe(
      'Tetrahedron(id: 1, name: Test, vertices: 4)',
    );
  });
});

describe('Shape', () => {
  test('Shape base class', () => {
    const shape = new (class extends Shape {
      constructor() {
        super('1', 'TestShape');
      }
      toString(): string {
        return 'TestShape';
      }
    })();
    expect(shape.id).toBe('1');
    expect(shape.name).toBe('TestShape');
  });
});
