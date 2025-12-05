import { ShapeRepository } from '../../src/repositories/ShapeRepository.js';
import { QuadrantSpecification } from '../../src/repositories/specifications/QuadrantSpecification.js';
import { DistanceRangeSpecification } from '../../src/repositories/specifications/DistanceRangeSpecification.js';
import { AreaRangeSpecification } from '../../src/repositories/specifications/AreaRangeSpecification.js';
import { VolumeRangeSpecification } from '../../src/repositories/specifications/VolumeRangeSpecification.js';
import { PerimeterRangeSpecification } from '../../src/repositories/specifications/PerimeterRangeSpecification.js';
import { SurfaceAreaRangeSpecification } from '../../src/repositories/specifications/SurfaceAreaRangeSpecification.js';
import { Rectangle } from '../../src/entities/Rectangle.js';
import { Tetrahedron } from '../../src/entities/Tetrahedron.js';
import { Point } from '../../src/entities/Point.js';
import { warehouse } from '../../src/warehouse/Warehouse.js';

describe('ShapeRepository', () => {
  let repository: ShapeRepository;
  let rectangle: Rectangle;
  let tetrahedron: Tetrahedron;

  beforeEach(() => {
    repository = new ShapeRepository();
    rectangle = new Rectangle(
      '1',
      'Rect1',
      [new Point(1, 1), new Point(1, 3), new Point(4, 3), new Point(4, 1)],
      warehouse,
    );
    tetrahedron = new Tetrahedron(
      '2',
      'Tetra1',
      [
        new Point(0, 0, 0),
        new Point(1, 0, 0),
        new Point(0, 1, 0),
        new Point(0, 0, 1),
      ],
      warehouse,
    );
  });

  test('should add and remove shapes', () => {
    repository.add(rectangle);
    repository.add(tetrahedron);

    expect(repository.getAll()).toHaveLength(2);
    expect(repository.remove(rectangle)).toBe(true);
    expect(repository.getAll()).toHaveLength(1);
  });

  test('should find shape by id', () => {
    repository.add(rectangle);
    repository.add(tetrahedron);

    expect(repository.getById('1')).toBe(rectangle);
    expect(repository.getById('3')).toBeUndefined();
  });

  test('should find shapes by name', () => {
    const rect2 = new Rectangle(
      '3',
      'Rect1',
      [new Point(0, 0), new Point(0, 1), new Point(1, 1), new Point(1, 0)],
      warehouse,
    );
    repository.add(rectangle);
    repository.add(rect2);
    repository.add(tetrahedron);

    expect(repository.getByName('Rect1')).toHaveLength(2);
  });

  test('should query by quadrant specification', () => {
    const rectInFirstQuadrant = new Rectangle(
      '3',
      'RectQ1',
      [new Point(1, 1), new Point(1, 2), new Point(2, 2), new Point(2, 1)],
      warehouse,
    );

    repository.add(rectInFirstQuadrant);
    repository.add(tetrahedron);

    const spec = new QuadrantSpecification(1);
    const result = repository.query(spec);

    // Both rectangle and tetrahedron are in first quadrant (all coordinates >= 0)
    expect(result).toHaveLength(2);
    expect(result.some(s => s.id === '3')).toBe(true);
    expect(result.some(s => s.id === '2')).toBe(true);
  });

  test('should query by distance range specification', () => {
    repository.add(rectangle);
    repository.add(tetrahedron);

    const spec = new DistanceRangeSpecification(0, 2);
    const result = repository.query(spec);

    expect(result.length).toBeGreaterThan(0);
  });

  test('should sort shapes', () => {
    const rect1 = new Rectangle(
      '1',
      'Beta',
      [new Point(0, 0), new Point(0, 1), new Point(1, 1), new Point(1, 0)],
      warehouse,
    );
    const rect2 = new Rectangle(
      '2',
      'Alpha',
      [new Point(2, 2), new Point(2, 3), new Point(3, 3), new Point(3, 2)],
      warehouse,
    );

    repository.add(rect2);
    repository.add(rect1);

    const sortedByName = repository.sortBy((a, b) =>
      a.name.localeCompare(b.name),
    );
    expect(sortedByName[0].name).toBe('Alpha');

    const sortedById = repository.sortBy((a, b) => {
      const idA = parseInt(a.id, 10);
      const idB = parseInt(b.id, 10);
      return idA - idB;
    });
    expect(sortedById[0].id).toBe('1');
  });

  test('should query by area range specification', () => {
    // The rectangle from beforeEach has points (1,1) and (4,3), so its area is 3 * 2 = 6.
    repository.add(rectangle);

    // This spec should find the rectangle
    const specInside = new AreaRangeSpecification(5, 7);
    const resultInside = repository.query(specInside);
    expect(resultInside).toHaveLength(1);
    expect(resultInside[0].id).toBe('1');

    // This spec should NOT find the rectangle
    const specOutside = new AreaRangeSpecification(10, 20);
    const resultOutside = repository.query(specOutside);
    expect(resultOutside).toHaveLength(0);
  });

  test('should query by perimeter range specification', () => {
    // The rectangle from beforeEach has sides 3 and 2, so its perimeter is (3+2)*2 = 10.
    repository.add(rectangle);

    const specInside = new PerimeterRangeSpecification(9, 11);
    const resultInside = repository.query(specInside);
    expect(resultInside).toHaveLength(1);
    expect(resultInside[0].id).toBe('1');

    const specOutside = new PerimeterRangeSpecification(12, 15);
    const resultOutside = repository.query(specOutside);
    expect(resultOutside).toHaveLength(0);
  });

  test('should query by volume range specification', () => {
    // The tetrahedron from beforeEach has a volume of 1/6 ~= 0.167
    repository.add(tetrahedron);

    const specInside = new VolumeRangeSpecification(0.1, 0.2);
    const resultInside = repository.query(specInside);
    expect(resultInside).toHaveLength(1);
    expect(resultInside[0].id).toBe('2');
  });

  test('should query by surface area range specification', () => {
    // The tetrahedron from beforeEach has 3 right triangles (area 0.5) and one equilateral triangle (area ~0.866). Total SA ~= 2.366
    repository.add(tetrahedron);

    const specInside = new SurfaceAreaRangeSpecification(2.3, 2.4);
    const resultInside = repository.query(specInside);
    expect(resultInside).toHaveLength(1);
    expect(resultInside[0].id).toBe('2');
  });
});
