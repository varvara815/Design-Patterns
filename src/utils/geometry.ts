import { Point } from '../entities/Point.js';
import { EPSILON } from './constants.js';

export class Geometry {
  // Pythagorean theorem: distance = √((x2-x1)² + (y2-y1)²)
  static calculateDistance2D(p1: Point, p2: Point): number {
    return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
  }

  // 3D distance: adds Z coordinate to Pythagorean theorem
  static calculateDistance3D(p1: Point, p2: Point): number {
    return Math.sqrt(
      (p2.x - p1.x) ** 2 +
        (p2.y - p1.y) ** 2 +
        ((p2.z || 0) - (p1.z || 0)) ** 2,
    );
  }

  // Vector subtraction: creates direction vector from point b to point a
  // Result shows "how to get from b to a": (a.x - b.x, a.y - b.y, a.z - b.z)
  static vectorSubtract(a: Point, b: Point): Point {
    return new Point(a.x - b.x, a.y - b.y, (a.z || 0) - (b.z || 0));
  }

  // Cross product: creates vector perpendicular to both input vectors
  // Used for calculating surface normals and volumes
  static crossProduct(a: Point, b: Point): Point {
    return new Point(
      a.y * (b.z || 0) - (a.z || 0) * b.y,
      (a.z || 0) * b.x - a.x * (b.z || 0),
      a.x * b.y - a.y * b.x,
    );
  }

  // Dot product: measures how much vectors point in same direction
  // Result: positive = same direction, zero = perpendicular, negative = opposite
  static dotProduct(a: Point, b: Point): number {
    return a.x * b.x + a.y * b.y + (a.z || 0) * (b.z || 0);
  }

  // Calculate angle between three points (p2 is the vertex of the angle)
  // Uses dot product formula: cos(angle) = (v1 · v2) / (|v1| * |v2|)
  static calculateAngle(p1: Point, p2: Point, p3: Point): number {
    // Create vectors from p2 to p1 and p2 to p3
    const v1 = { x: p1.x - p2.x, y: p1.y - p2.y };
    const v2 = { x: p3.x - p2.x, y: p3.y - p2.y };

    // Calculate dot product and magnitudes
    const dot = v1.x * v2.x + v1.y * v2.y;
    const mag1 = Math.sqrt(v1.x ** 2 + v1.y ** 2);
    const mag2 = Math.sqrt(v2.x ** 2 + v2.y ** 2);

    // Calculate angle using arccos, clamp to [-1,1] to avoid floating point errors
    const cos = dot / (mag1 * mag2);
    return Math.acos(Math.max(-1, Math.min(1, cos))) * (180 / Math.PI);
  }

  // Check if two lines are parallel by comparing their direction vectors
  // Lines are parallel if cross product of directions equals zero
  static areLinesParallel(p1: Point, p2: Point, p3: Point, p4: Point): boolean {
    // Direction vectors for both lines
    const dx1 = p2.x - p1.x;
    const dy1 = p2.y - p1.y;
    const dx2 = p4.x - p3.x;
    const dy2 = p4.y - p3.y;

    // Cross product of 2D vectors: dx1*dy2 - dy1*dx2
    const crossProduct = dx1 * dy2 - dy1 * dx2;
    return Math.abs(crossProduct) < EPSILON;
  }
}
