import { Shape } from '../../entities/Shape.js';
import { Specification } from '../Specification';

// Specification to find shapes with at least one vertex within a distance range from origin

export class DistanceRangeSpecification implements Specification<Shape> {
  constructor(
    private minDistance: number,
    private maxDistance: number,
  ) {}

  //  Checks if shape has any vertex within the specified distance range from origin (0,0,0)
  //  Uses Euclidean distance formula: √(x² + y² + z²)

  isSatisfiedBy(shape: Shape): boolean {
    const vertices = shape.getVertices();
    return vertices.some(point => {
      // Calculate Euclidean distance from origin to point
      const distance = Math.sqrt(
        point.x ** 2 + point.y ** 2 + (point.z || 0) ** 2,
      );
      return distance >= this.minDistance && distance <= this.maxDistance;
    });
  }
}
