import { Shape } from '../../entities/Shape.js';
import { warehouse } from '../../warehouse/Warehouse.js';
import { Specification } from '../Specification';

export class VolumeRangeSpecification implements Specification<Shape> {
  constructor(
    private minVolume: number,
    private maxVolume: number,
  ) {}

  isSatisfiedBy(shape: Shape): boolean {
    const metrics = warehouse.getMetrics(shape.id);
    if (metrics?.volume !== undefined) {
      return (
        metrics.volume >= this.minVolume && metrics.volume <= this.maxVolume
      );
    }
    return false;
  }
}
