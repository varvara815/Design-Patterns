import {
  ShapeMetrics,
  ShapeInterface,
  IWarehouse,
} from '../warehouse/Warehouse.js';
import { Point } from './Point.js';

export abstract class Shape implements ShapeInterface {
  constructor(
    public readonly id: string,
    public readonly name: string,
    protected warehouse: IWarehouse,
  ) {}

  abstract toString(): string;

  protected notifyWarehouse(): void {
    this.warehouse.notify(this);
  }

  public abstract calculateMetrics(): ShapeMetrics;

  public abstract getVertices(): Point[];

  public abstract getFirstPoint(): Point;
}
