import { Shape } from '../../entities/Shape.js';
import { Point } from '../../entities/Point.js';
import { Specification } from '../Specification';

export class QuadrantSpecification implements Specification<Shape> {
  constructor(private quadrant: number) {}

  isSatisfiedBy(shape: Shape): boolean {
    const vertices = shape.getVertices();
    if (vertices.length === 0) {
      return false;
    }
    return vertices.every(point => this.isPointInQuadrant(point));
  }

  private isPointInQuadrant(point: Point): boolean {
    switch (this.quadrant) {
      case 1:
        return point.x >= 0 && point.y >= 0;
      case 2:
        return point.x <= 0 && point.y >= 0;
      case 3:
        return point.x <= 0 && point.y <= 0;
      case 4:
        return point.x >= 0 && point.y <= 0;
      default:
        return false;
    }
  }
}
