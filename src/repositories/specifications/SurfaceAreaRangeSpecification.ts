import { Shape } from '../../entities/Shape.js';
import { warehouse } from '../../warehouse/Warehouse.js';
import { Specification } from '../Specification';

export class SurfaceAreaRangeSpecification implements Specification<Shape> {
  constructor(
    private minSurfaceArea: number,
    private maxSurfaceArea: number,
  ) {}

  isSatisfiedBy(shape: Shape): boolean {
    const metrics = warehouse.getMetrics(shape.id);
    if (metrics?.surfaceArea !== undefined) {
      return (
        metrics.surfaceArea >= this.minSurfaceArea &&
        metrics.surfaceArea <= this.maxSurfaceArea
      );
    }
    return false;
  }
}
