import { Point } from '../entities/Point.js';
import { EPSILON } from './constants.js';

export class GeometryUtils {
  static calculateDistance(p1: Point, p2: Point): number {
    return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
  }

  static calculateDistance3D(p1: Point, p2: Point): number {
    return Math.sqrt(
      (p2.x - p1.x) ** 2 +
        (p2.y - p1.y) ** 2 +
        ((p2.z || 0) - (p1.z || 0)) ** 2,
    );
  }

  static calculateTriangleArea(a: Point, b: Point, c: Point): number {
    const [ab, ac, bc] = [
      this.calculateDistance3D(a, b),
      this.calculateDistance3D(a, c),
      this.calculateDistance3D(b, c),
    ];

    // Heron's formula
    const s = (ab + ac + bc) / 2;

    if (s <= ab || s <= ac || s <= bc) return 0;

    return Math.sqrt(s * (s - ab) * (s - ac) * (s - bc));
  }

  // Check if two line segments intersect using orientation method
  // Lines intersect if endpoints are on opposite sides of each other
  static doLinesIntersect(p1: Point, p2: Point, p3: Point, p4: Point): boolean {
    const d1 = this.orientation(p1, p2, p3);
    const d2 = this.orientation(p1, p2, p4);
    const d3 = this.orientation(p3, p4, p1);
    const d4 = this.orientation(p3, p4, p2);

    // Lines intersect if points are on opposite sides
    if (
      ((d1 > 0 && d2 < 0) || (d1 < 0 && d2 > 0)) &&
      ((d3 > 0 && d4 < 0) || (d3 < 0 && d4 > 0))
    ) {
      return true;
    }

    return false;
  }

  // Calculate orientation of three points (clockwise, counterclockwise, or collinear)
  // Positive = counterclockwise, Negative = clockwise, Zero = collinear
  private static orientation(p: Point, q: Point, r: Point): number {
    return (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
  }

  // Check if quadrilateral has self-intersecting sides (creates "bowtie" shape)
  // Tests if opposite sides intersect each other
  static isQuadrilateralSelfIntersecting(points: Point[]): boolean {
    if (points.length !== 4) return false;

    // Check if diagonal sides intersect
    if (this.doLinesIntersect(points[0], points[1], points[2], points[3])) {
      return true;
    }

    if (this.doLinesIntersect(points[1], points[2], points[3], points[0])) {
      return true;
    }
    return false;
  }

  static sortPointsClockwise(points: Point[]): Point[] {
    if (points.length !== 4) return points;

    // Calculate centroid
    const centerX = points.reduce((sum, p) => sum + p.x, 0) / 4;
    const centerY = points.reduce((sum, p) => sum + p.y, 0) / 4;

    // Sort by polar angle from centroid
    return points.sort((a, b) => {
      const angleA = Math.atan2(a.y - centerY, a.x - centerX);
      const angleB = Math.atan2(b.y - centerY, b.x - centerX);
      return angleA - angleB;
    });
  }

  // Validate that quadrilateral points are in consistent order (all clockwise or counterclockwise)
  // Uses cross product to check if all turns have the same direction
  static isValidQuadrilateralOrder(points: Point[]): boolean {
    if (points.length !== 4) return false;
    let crossProductSign = 0;

    for (let i = 0; i < 4; i++) {
      const p1 = points[i];
      const p2 = points[(i + 1) % 4];
      const p3 = points[(i + 2) % 4];

      // Calculate cross product to determine turn direction
      const crossProduct =
        (p2.x - p1.x) * (p3.y - p2.y) - (p2.y - p1.y) * (p3.x - p2.x);

      if (Math.abs(crossProduct) > EPSILON) {
        if (crossProductSign === 0) {
          // Set initial direction
          crossProductSign = crossProduct > 0 ? 1 : -1;
        } else if (
          (crossProduct > 0 && crossProductSign < 0) ||
          (crossProduct < 0 && crossProductSign > 0)
        ) {
          // Direction changed - invalid order
          return false;
        }
      }
    }

    return true;
  }
}
