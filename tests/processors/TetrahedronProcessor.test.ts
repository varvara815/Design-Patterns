import { TetrahedronProcessor } from '../../src/processors/TetrahedronProcessor.js';
import { Tetrahedron } from '../../src/entities/Tetrahedron.js';
import { Point } from '../../src/entities/Point.js';

describe('TetrahedronProcessor', () => {
  it('should process valid tetrahedron', () => {
    const vertices = [
      new Point(0, 0, 0),
      new Point(1, 0, 0),
      new Point(0, 1, 0),
      new Point(0, 0, 1),
    ];
    const tetrahedron = new Tetrahedron('test', 'test-tetrahedron', vertices);

    expect(() =>
      TetrahedronProcessor.processTetrahedron(tetrahedron),
    ).not.toThrow();
  });

  it('should handle processing errors', () => {
    const invalidVertices = [new Point(0, 0, 0)];
    const tetrahedron = new Tetrahedron(
      'invalid',
      'invalid-tetrahedron',
      invalidVertices,
    );

    expect(() =>
      TetrahedronProcessor.processTetrahedron(tetrahedron),
    ).toThrow();
  });
});
