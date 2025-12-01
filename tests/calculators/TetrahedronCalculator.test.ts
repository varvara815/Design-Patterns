import { TetrahedronCalculator } from '../../src/calculators/TetrahedronCalculator';
import { Point } from '../../src/entities/Point';
import { COORDINATE_PLANES } from '../../src/utils/constants';

describe('TetrahedronCalculator', () => {
  const validTetrahedronPoints = [
    new Point(0, 0, 0),
    new Point(1, 0, 0),
    new Point(0, 1, 0),
    new Point(0, 0, 1),
  ];

  const tetrahedronOnXYPlane = [
    new Point(0, 0, 0),
    new Point(1, 0, 0),
    new Point(0, 1, 0),
    new Point(0, 0, 1),
  ];

  test('Basic calculations', () => {
    const area = TetrahedronCalculator.calculateSurfaceArea(
      validTetrahedronPoints,
    );
    const volume = TetrahedronCalculator.calculateVolume(
      validTetrahedronPoints,
    );
    const coplanarPoints = [
      new Point(0, 0, 0),
      new Point(1, 0, 0),
      new Point(0, 1, 0),
      new Point(1, 1, 0),
    ];

    expect(area).toBeCloseTo(2.366, 2);
    expect(volume).toBeCloseTo(0.166, 2);
    expect(TetrahedronCalculator.calculateVolume(coplanarPoints)).toBe(0);
  });

  test('Tetrahedron validation', () => {
    const coplanarPoints = [
      new Point(0, 0, 0),
      new Point(1, 0, 0),
      new Point(0, 1, 0),
      new Point(1, 1, 0),
    ];
    const insufficientPoints = [
      new Point(0, 0, 0),
      new Point(1, 0, 0),
      new Point(0, 1, 0),
    ];

    expect(TetrahedronCalculator.isTetrahedron(validTetrahedronPoints)).toBe(
      true,
    );
    expect(TetrahedronCalculator.isTetrahedron(coplanarPoints)).toBe(false);
    expect(TetrahedronCalculator.isTetrahedron(insufficientPoints)).toBe(false);
  });

  test('Base plane detection', () => {
    const tetrahedronWithXZBase = [
      new Point(0, 0, 0),
      new Point(1, 0, 0),
      new Point(0, 0, 1),
      new Point(0, 1, 0.5),
    ];
    const invalidPoints = [
      new Point(1, 1, 1),
      new Point(2, 1, 1),
      new Point(1, 2, 1),
      new Point(1, 1, 2),
    ];

    expect(TetrahedronCalculator.findBasePlane(tetrahedronOnXYPlane)).toBe(
      COORDINATE_PLANES.XY,
    );
    expect(TetrahedronCalculator.findBasePlane(tetrahedronWithXZBase)).toBe(
      COORDINATE_PLANES.XZ,
    );
    expect(TetrahedronCalculator.findBasePlane(invalidPoints)).toBeNull();
  });

  test('Volume ratio calculations', () => {
    const pointsAbove = [
      new Point(0, 0, 1),
      new Point(1, 0, 1),
      new Point(0, 1, 1),
      new Point(0, 0, 2),
    ];
    const pointsBelow = [
      new Point(0, 0, -1),
      new Point(1, 0, -1),
      new Point(0, 1, -1),
      new Point(0, 0, -2),
    ];

    const ratios = TetrahedronCalculator.calculatePlaneVolumeRatio(
      validTetrahedronPoints,
      COORDINATE_PLANES.XY,
    );
    const ratiosAbove = TetrahedronCalculator.calculatePlaneVolumeRatio(
      pointsAbove,
      COORDINATE_PLANES.XY,
    );
    const ratiosBelow = TetrahedronCalculator.calculatePlaneVolumeRatio(
      pointsBelow,
      COORDINATE_PLANES.XY,
    );

    expect(ratios.abovePlane).toBe(0.25);
    expect(ratios.belowPlane).toBe(0);
    expect(ratiosAbove.abovePlane).toBe(1);
    expect(ratiosBelow.belowPlane).toBe(1);
  });

  test('Edge cases and special scenarios', () => {
    const degeneratePoints = [
      new Point(0, 0, 0),
      new Point(1, 0, 0),
      new Point(0, 1, 0),
      new Point(0.5, 0.5, 0),
    ];
    const pointsAcrossPlane = [
      new Point(0, 0, -1),
      new Point(1, 0, 1),
      new Point(0, 1, -1),
      new Point(0, 0, 1),
    ];

    expect(TetrahedronCalculator.calculateVolume(degeneratePoints)).toBe(0);
    expect(TetrahedronCalculator.isTetrahedron(degeneratePoints)).toBe(false);

    const ratios = TetrahedronCalculator.calculatePlaneVolumeRatio(
      pointsAcrossPlane,
      COORDINATE_PLANES.XY,
    );
    expect(ratios.abovePlane).toBe(0.5);
    expect(ratios.belowPlane).toBe(0.5);
  });
});
