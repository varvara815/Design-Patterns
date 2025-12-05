import { TetrahedronProcessor } from '../../src/processors/TetrahedronProcessor.js';
import { Tetrahedron } from '../../src/entities/Tetrahedron.js';
import { Point } from '../../src/entities/Point.js';
import { warehouse } from '../../src/warehouse/Warehouse.js';

describe('TetrahedronProcessor', () => {
  it('should process valid tetrahedron', () => {
    const vertices = [
      new Point(0, 0, 0),
      new Point(1, 0, 0),
      new Point(0, 1, 0),
      new Point(0, 0, 1),
    ];
    const tetrahedron = new Tetrahedron(
      'test',
      'test-tetrahedron',
      vertices,
      warehouse,
    );

    expect(() =>
      TetrahedronProcessor.processTetrahedron(tetrahedron),
    ).not.toThrow();
  });

  it('should handle processing errors', () => {
    // Create a tetrahedron with 4 vertices but invalid geometry (all coplanar)
    const invalidVertices = [
      new Point(0, 0, 0),
      new Point(1, 0, 0),
      new Point(2, 0, 0),
      new Point(3, 0, 0),
    ];
    const tetrahedron = new Tetrahedron(
      'invalid',
      'invalid-tetrahedron',
      invalidVertices,
      warehouse,
    );

    // The processor should handle this gracefully
    expect(() =>
      TetrahedronProcessor.processTetrahedron(tetrahedron),
    ).not.toThrow();
  });
});
