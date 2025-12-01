import { TetrahedronCalculator } from '../../src/calculators/TetrahedronCalculator.js';
import { Point } from '../../src/entities/Point.js';
import { COORDINATE_PLANES } from '../../src/utils/constants.js';

describe('TetrahedronCalculator Extended', () => {
  const validTetrahedron = [
    new Point(0, 0, 0),
    new Point(1, 0, 0),
    new Point(0, 1, 0),
    new Point(0, 0, 1),
  ];

  it('should find base plane for tetrahedron', () => {
    const xyPlaneTetrahedron = [
      new Point(0, 0, 0),
      new Point(1, 0, 0),
      new Point(0, 1, 0),
      new Point(0.5, 0.5, 1),
    ];

    const basePlane = TetrahedronCalculator.findBasePlane(xyPlaneTetrahedron);
    expect(basePlane).toBe(COORDINATE_PLANES.XY);
  });

  it('should return null for invalid tetrahedron base plane', () => {
    const invalidVertices = [new Point(0, 0, 0)];
    const basePlane = TetrahedronCalculator.findBasePlane(invalidVertices);
    expect(basePlane).toBeNull();
  });

  it('should calculate plane volume ratio', () => {
    const ratio = TetrahedronCalculator.calculatePlaneVolumeRatio(
      validTetrahedron,
      COORDINATE_PLANES.XY,
    );

    expect(ratio).toHaveProperty('abovePlane');
    expect(ratio).toHaveProperty('belowPlane');
    expect(typeof ratio.abovePlane).toBe('number');
    expect(typeof ratio.belowPlane).toBe('number');
  });

  it('should handle invalid tetrahedron in volume ratio calculation', () => {
    const invalidVertices = [new Point(0, 0, 0)];
    const ratio = TetrahedronCalculator.calculatePlaneVolumeRatio(
      invalidVertices,
      COORDINATE_PLANES.XY,
    );

    expect(ratio.abovePlane).toBe(1);
    expect(ratio.belowPlane).toBe(0);
  });
});
