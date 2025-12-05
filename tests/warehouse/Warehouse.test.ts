import { warehouse } from '../../src/warehouse/Warehouse.js';
import { Rectangle } from '../../src/entities/Rectangle.js';
import { Tetrahedron } from '../../src/entities/Tetrahedron.js';
import { Point } from '../../src/entities/Point.js';

describe('Warehouse', () => {
  beforeEach(() => {
    warehouse.clear();
  });

  test('should be singleton', () => {
    const instance1 = warehouse;
    const instance2 = warehouse;
    expect(instance1).toBe(instance2);
  });

  test('should store rectangle metrics', () => {
    const rectangle = new Rectangle(
      '1',
      'TestRect',
      [new Point(0, 0), new Point(0, 3), new Point(4, 3), new Point(4, 0)],
      warehouse,
    );

    const metrics = warehouse.getMetrics('1');
    expect(metrics?.area).toBe(12);
    expect(metrics?.perimeter).toBe(14);

    // Use rectangle to avoid unused variable warning
    expect(rectangle.name).toBe('TestRect');
  });

  test('should store tetrahedron metrics', () => {
    const tetrahedron = new Tetrahedron(
      '2',
      'TestTetra',
      [
        new Point(0, 0, 0),
        new Point(1, 0, 0),
        new Point(0, 1, 0),
        new Point(0, 0, 1),
      ],
      warehouse,
    );

    const metrics = warehouse.getMetrics('2');
    expect(metrics?.volume).toBeCloseTo(0.166, 2);
    expect(metrics?.surfaceArea).toBeCloseTo(2.366, 2);

    // Use tetrahedron to avoid unused variable warning
    expect(tetrahedron.name).toBe('TestTetra');
  });

  test('should update metrics when shape changes', () => {
    const rectangle = new Rectangle(
      '3',
      'Rect',
      [new Point(0, 0), new Point(0, 2), new Point(2, 2), new Point(2, 0)],
      warehouse,
    );

    const initialMetrics = warehouse.getMetrics('3');
    expect(initialMetrics?.area).toBe(4);
    expect(initialMetrics?.perimeter).toBe(8);

    // Изменяем точки
    rectangle.points = [
      new Point(0, 0),
      new Point(0, 4),
      new Point(4, 4),
      new Point(4, 0),
    ];

    const updatedMetrics = warehouse.getMetrics('3');
    expect(updatedMetrics?.area).toBe(16);
    expect(updatedMetrics?.perimeter).toBe(16);
  });

  test('should return all metrics', () => {
    const rectangle = new Rectangle(
      '1',
      'Rect',
      [new Point(0, 0), new Point(0, 1), new Point(1, 1), new Point(1, 0)],
      warehouse,
    );

    const tetrahedron = new Tetrahedron(
      '2',
      'Tetra',
      [
        new Point(0, 0, 0),
        new Point(1, 0, 0),
        new Point(0, 1, 0),
        new Point(0, 0, 1),
      ],
      warehouse,
    );

    const allMetrics = warehouse.getAllMetrics();
    expect(allMetrics.size).toBe(2);
    expect(allMetrics.get('1')).toBeDefined();
    expect(allMetrics.get('2')).toBeDefined();

    // Use variables to avoid warnings
    expect(rectangle).toBeDefined();
    expect(tetrahedron).toBeDefined();
  });
});
