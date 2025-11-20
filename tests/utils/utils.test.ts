import { GeometryUtils } from '../../src/utils/GeometryUtils';
import { DataValidator } from '../../src/validators/DataValidator';
import { ValidationError } from '../../src/utils/exceptions';
import { Point } from '../../src/entities/Point';

describe('Utils', () => {
  test('Geometry calculations', () => {
    const p1 = new Point(0, 0);
    const p2 = new Point(3, 4);
    const p3D1 = new Point(0, 0, 0);
    const p3D2 = new Point(1, 1, 1);
    const a = new Point(0, 0, 0);
    const b = new Point(1, 0, 0);
    const c = new Point(0, 1, 0);
    const collinear = new Point(2, 0, 0);

    expect(GeometryUtils.calculateDistance(p1, p2)).toBe(5);
    expect(GeometryUtils.calculateDistance3D(p3D1, p3D2)).toBeCloseTo(1.732, 2);
    expect(GeometryUtils.calculateTriangleArea(a, b, c)).toBeCloseTo(0.5, 2);
    expect(GeometryUtils.calculateTriangleArea(a, b, collinear)).toBe(0);
  });

  test('Line intersection and quadrilateral validation', () => {
    const p1 = new Point(0, 0);
    const p2 = new Point(2, 2);
    const p3 = new Point(0, 2);
    const p4 = new Point(2, 0);
    const p5 = new Point(0, 0);
    const p6 = new Point(1, 0);
    const p7 = new Point(0, 1);
    const p8 = new Point(1, 1);
    const selfIntersecting = [
      new Point(0, 0),
      new Point(2, 2),
      new Point(2, 0),
      new Point(0, 2),
    ];
    const validQuad = [
      new Point(0, 0),
      new Point(0, 1),
      new Point(1, 1),
      new Point(1, 0),
    ];
    const wrongLength = [new Point(0, 0), new Point(1, 0)];

    expect(GeometryUtils.doLinesIntersect(p1, p2, p3, p4)).toBe(true);
    expect(GeometryUtils.doLinesIntersect(p5, p6, p7, p8)).toBe(false);
    expect(
      GeometryUtils.isQuadrilateralSelfIntersecting(selfIntersecting),
    ).toBe(true);
    expect(GeometryUtils.isQuadrilateralSelfIntersecting(validQuad)).toBe(
      false,
    );
    expect(GeometryUtils.isQuadrilateralSelfIntersecting(wrongLength)).toBe(
      false,
    );
    expect(GeometryUtils.isValidQuadrilateralOrder(validQuad)).toBe(true);
  });

  test('Data validation', () => {
    expect(DataValidator.validateNumber('123.45')).toBe(123.45);
    expect(DataValidator.validateNumber('0')).toBe(0);
    expect(DataValidator.validateNumber('-123.45')).toBe(-123.45);
    expect(() => DataValidator.validateNumber('abc')).toThrow(ValidationError);

    const validRectData = ['0', '0', '0', '3', '4', '3', '4', '0'];
    const validTetraData = [
      '0',
      '0',
      '0',
      '1',
      '0',
      '0',
      '0',
      '1',
      '0',
      '0',
      '0',
      '1',
    ];
    const insufficientData = ['0', '0', '0', '3'];

    expect(DataValidator.parseRectangleCoordinates(validRectData)).toEqual([
      0, 0, 0, 3, 4, 3, 4, 0,
    ]);
    expect(DataValidator.parseTetrahedronCoordinates(validTetraData)).toEqual([
      0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1,
    ]);
    expect(() =>
      DataValidator.parseRectangleCoordinates(insufficientData),
    ).toThrow(ValidationError);
  });
});
