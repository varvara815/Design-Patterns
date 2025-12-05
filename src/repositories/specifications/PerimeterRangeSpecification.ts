import { Shape } from '../../entities/Shape.js';
import { warehouse } from '../../warehouse/Warehouse.js';
import { Specification } from '../Specification';

export class PerimeterRangeSpecification implements Specification<Shape> {
  constructor(
    private minPerimeter: number,
    private maxPerimeter: number,
  ) {}

  isSatisfiedBy(shape: Shape): boolean {
    const metrics = warehouse.getMetrics(shape.id);
    if (metrics?.perimeter !== undefined) {
      return (
        metrics.perimeter >= this.minPerimeter &&
        metrics.perimeter <= this.maxPerimeter
      );
    }
    return false;
  }
}
