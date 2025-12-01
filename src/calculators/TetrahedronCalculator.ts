import { Point } from '../entities/Point.js';
import {
  EPSILON,
  COORDINATE_PLANES,
  CoordinatePlane,
} from '../utils/constants.js';
import { GeometryUtils } from '../utils/GeometryUtils.js';
import { Geometry } from '../utils/geometry.js';

interface PlaneVolumeRatio {
  abovePlane: number;
  belowPlane: number;
}

export class TetrahedronCalculator {
  static calculateSurfaceArea(vertices: Point[]): number {
    return [
      [0, 1, 2],
      [0, 1, 3],
      [0, 2, 3],
      [1, 2, 3],
    ].reduce((total, [i, j, k]) => {
      const area = this.calculateTriangleArea(
        vertices[i],
        vertices[j],
        vertices[k],
      );
      return total + area;
    }, 0);
  }

  static calculateVolume(vertices: Point[]): number {
    const [a, b, c, d] = vertices;
    const ab = Geometry.vectorSubtract(b, a);
    const ac = Geometry.vectorSubtract(c, a);
    const ad = Geometry.vectorSubtract(d, a);

    // Volume = |AB · (AC × AD)| / 6 (scalar triple product formula)
    const cross = Geometry.crossProduct(ac, ad);
    const scalarTripleProduct = Geometry.dotProduct(ab, cross);

    return Math.abs(scalarTripleProduct) / 6;
  }

  static isTetrahedron(vertices: Point[]): boolean {
    return vertices.length === 4 && this.calculateVolume(vertices) > EPSILON;
  }

  static findBasePlane(vertices: Point[]): CoordinatePlane | null {
    try {
      if (!this.isTetrahedron(vertices)) return null;

      const planes = [
        COORDINATE_PLANES.XY,
        COORDINATE_PLANES.XZ,
        COORDINATE_PLANES.YZ,
      ];
      return planes.find(plane => this.hasBaseOnPlane(vertices, plane)) || null;
    } catch {
      return null;
    }
  }

  static calculatePlaneVolumeRatio(
    vertices: Point[],
    plane: CoordinatePlane,
  ): PlaneVolumeRatio {
    try {
      if (!this.isTetrahedron(vertices)) {
        return { abovePlane: 1, belowPlane: 0 };
      }

      // Calculate signed distances from vertices to coordinate plane
      const distances = vertices.map(vertex =>
        this.getCoordinate(vertex, plane),
      );
      const aboveCount = distances.filter(d => d > EPSILON).length;
      const belowCount = distances.filter(d => d < -EPSILON).length;

      if (aboveCount === 4) return { abovePlane: 1, belowPlane: 0 };
      if (belowCount === 4) return { abovePlane: 0, belowPlane: 1 };

      // Simplified ratio based on vertex distribution
      return {
        abovePlane: aboveCount / 4,
        belowPlane: belowCount / 4,
      };
    } catch {
      return { abovePlane: 0, belowPlane: 0 };
    }
  }

  private static hasBaseOnPlane(
    vertices: Point[],
    plane: CoordinatePlane,
  ): boolean {
    for (let i = 0; i < 4; i++) {
      const basePoints = vertices.filter((_, j) => j !== i);
      if (this.arePointsOnPlane(basePoints, plane)) {
        return true;
      }
    }
    return false;
  }

  private static arePointsOnPlane(
    points: Point[],
    plane: CoordinatePlane,
  ): boolean {
    return points.every(
      point => Math.abs(this.getCoordinate(point, plane)) < EPSILON,
    );
  }

  private static getCoordinate(point: Point, plane: CoordinatePlane): number {
    switch (plane) {
      case COORDINATE_PLANES.XY:
        return point.z || 0;
      case COORDINATE_PLANES.XZ:
        return point.y;
      case COORDINATE_PLANES.YZ:
        return point.x;
      default:
        return 0;
    }
  }

  private static calculateTriangleArea(a: Point, b: Point, c: Point): number {
    return GeometryUtils.calculateTriangleArea(a, b, c);
  }

  private static calculateVolumeAbovePlane(
    vertices: Point[],
    plane: CoordinatePlane,
  ): number {
    const distances = vertices.map(vertex => this.getCoordinate(vertex, plane));
    const aboveVertices = vertices.filter((_, i) => distances[i] > EPSILON);
    const belowVertices = vertices.filter((_, i) => distances[i] < -EPSILON);

    if (aboveVertices.length === 0) return 0;
    if (belowVertices.length === 0) return this.calculateVolume(vertices);

    const intersectionPoints: Point[] = [];
    for (let i = 0; i < 4; i++) {
      for (let j = i + 1; j < 4; j++) {
        const intersection = this.getPlaneIntersection(
          vertices[i],
          vertices[j],
          plane,
        );
        if (intersection) {
          intersectionPoints.push(intersection);
        }
      }
    }

    if (aboveVertices.length === 1) {
      if (intersectionPoints.length >= 3) {
        return this.calculateVolume([
          aboveVertices[0],
          ...intersectionPoints.slice(0, 3),
        ]);
      }
    } else if (aboveVertices.length === 3) {
      const totalVolume = this.calculateVolume(vertices);
      if (intersectionPoints.length >= 3) {
        const belowVolume = this.calculateVolume([
          belowVertices[0],
          ...intersectionPoints.slice(0, 3),
        ]);
        return totalVolume - belowVolume;
      }
    }

    const totalVolume = this.calculateVolume(vertices);
    const aboveRatio = aboveVertices.length / 4;
    return totalVolume * aboveRatio;
  }

  private static getPlaneIntersection(
    p1: Point,
    p2: Point,
    plane: CoordinatePlane,
  ): Point | null {
    const coord1 = this.getCoordinate(p1, plane);
    const coord2 = this.getCoordinate(p2, plane);

    if (
      (coord1 > EPSILON && coord2 > EPSILON) ||
      (coord1 < -EPSILON && coord2 < -EPSILON)
    ) {
      return null;
    }

    if (Math.abs(coord1) <= EPSILON) return p1;
    if (Math.abs(coord2) <= EPSILON) return p2;

    const t = -coord1 / (coord2 - coord1);
    if (t < 0 || t > 1) return null;

    return new Point(
      p1.x + t * (p2.x - p1.x),
      p1.y + t * (p2.y - p1.y),
      (p1.z || 0) + t * ((p2.z || 0) - (p1.z || 0)),
    );
  }
}
