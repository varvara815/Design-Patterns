import { Shape } from '../../entities/Shape.js';
import { warehouse } from '../../warehouse/Warehouse.js';
import { Specification } from '../Specification';

export class AreaRangeSpecification implements Specification<Shape> {
  constructor(
    private minArea: number,
    private maxArea: number,
  ) {}

  isSatisfiedBy(shape: Shape): boolean {
    const metrics = warehouse.getMetrics(shape.id);
    if (metrics?.area !== undefined) {
      return metrics.area >= this.minArea && metrics.area <= this.maxArea;
    }
    return false;
  }
}
