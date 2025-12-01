import { Point } from '../entities/Point';
import { EPSILON } from '../utils/constants';
import { GeometryUtils } from '../utils/GeometryUtils';
import { Geometry } from '../utils/geometry';

export class RectangleCalculator {
  static calculateArea(points: Point[]): number {
    if (points.length !== 4) return 0;

    // Shoelace formula for polygon area
    let area = 0;
    for (let i = 0; i < 4; i++) {
      const j = (i + 1) % 4;
      area += points[i].x * points[j].y;
      area -= points[j].x * points[i].y;
    }
    return Math.abs(area) / 2;
  }

  static calculatePerimeter(points: Point[]): number {
    const side1 = Geometry.calculateDistance2D(points[0], points[1]);
    const side2 = Geometry.calculateDistance2D(points[1], points[2]);
    return 2 * (side1 + side2);
  }

  static isRectangle(points: Point[]): boolean {
    try {
      if (points.length !== 4) return false;

      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          if (
            Math.abs(points[i].x - points[j].x) < EPSILON &&
            Math.abs(points[i].y - points[j].y) < EPSILON
          ) {
            return false;
          }
        }
      }

      if (GeometryUtils.isQuadrilateralSelfIntersecting(points)) return false;
      if (!GeometryUtils.isValidQuadrilateralOrder(points)) return false;

      const sortedPoints = GeometryUtils.sortPointsClockwise(points);
      const sides = [
        Geometry.calculateDistance2D(sortedPoints[0], sortedPoints[1]),
        Geometry.calculateDistance2D(sortedPoints[1], sortedPoints[2]),
        Geometry.calculateDistance2D(sortedPoints[2], sortedPoints[3]),
        Geometry.calculateDistance2D(sortedPoints[3], sortedPoints[0]),
      ];

      if (
        Math.abs(sides[0] - sides[2]) > EPSILON ||
        Math.abs(sides[1] - sides[3]) > EPSILON
      ) {
        return false;
      }

      if (
        !Geometry.areLinesParallel(
          sortedPoints[0],
          sortedPoints[1],
          sortedPoints[2],
          sortedPoints[3],
        ) ||
        !Geometry.areLinesParallel(
          sortedPoints[1],
          sortedPoints[2],
          sortedPoints[3],
          sortedPoints[0],
        )
      ) {
        return false;
      }

      for (let i = 0; i < 4; i++) {
        const angle = Geometry.calculateAngle(
          sortedPoints[i],
          sortedPoints[(i + 1) % 4],
          sortedPoints[(i + 2) % 4],
        );
        if (Math.abs(angle - 90) > EPSILON) return false;
      }

      return true;
    } catch {
      return false;
    }
  }

  static isConvex(points: Point[]): boolean {
    if (points.length !== 4) return false;

    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        if (
          Math.abs(points[i].x - points[j].x) < EPSILON &&
          Math.abs(points[i].y - points[j].y) < EPSILON
        ) {
          return false;
        }
      }
    }

    if (GeometryUtils.isQuadrilateralSelfIntersecting(points)) {
      return false;
    }

    const sortedPoints = GeometryUtils.sortPointsClockwise(points);

    let sign = 0;
    for (let i = 0; i < 4; i++) {
      const p1 = sortedPoints[i];
      const p2 = sortedPoints[(i + 1) % 4];
      const p3 = sortedPoints[(i + 2) % 4];

      const crossProduct =
        (p2.x - p1.x) * (p3.y - p2.y) - (p2.y - p1.y) * (p3.x - p2.x);

      if (Math.abs(crossProduct) >= EPSILON) {
        if (sign === 0) {
          sign = crossProduct > 0 ? 1 : -1;
        } else if (
          (crossProduct > 0 && sign < 0) ||
          (crossProduct < 0 && sign > 0)
        ) {
          return false;
        }
      }
    }
    return true;
  }

  static isSquare(points: Point[]): boolean {
    if (!this.isRectangle(points)) return false;

    const side1 = Geometry.calculateDistance2D(points[0], points[1]);
    const side2 = Geometry.calculateDistance2D(points[1], points[2]);

    return Math.abs(side1 - side2) < EPSILON;
  }

  static isRhombus(points: Point[]): boolean {
    if (!this.isConvex(points)) return false;

    const sides = [
      Geometry.calculateDistance2D(points[0], points[1]),
      Geometry.calculateDistance2D(points[1], points[2]),
      Geometry.calculateDistance2D(points[2], points[3]),
      Geometry.calculateDistance2D(points[3], points[0]),
    ];

    return sides.every(side => Math.abs(side - sides[0]) < EPSILON);
  }

  static isTrapezoid(points: Point[]): boolean {
    if (!this.isConvex(points) || points.length !== 4) return false;

    const sides = [
      [points[0], points[1]],
      [points[1], points[2]],
      [points[2], points[3]],
      [points[3], points[0]],
    ];

    for (let i = 0; i < 4; i++) {
      for (let j = i + 1; j < 4; j++) {
        if (
          Geometry.areLinesParallel(
            sides[i][0],
            sides[i][1],
            sides[j][0],
            sides[j][1],
          )
        ) {
          return true;
        }
      }
    }
    return false;
  }
}
