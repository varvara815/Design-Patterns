import { Shape } from './Shape.js';
import { Point } from './Point.js';
import { ShapeMetrics, IWarehouse } from '../warehouse/Warehouse.js';
import { RectangleCalculator } from '../calculators/RectangleCalculator.js';

export class Rectangle extends Shape {
  private _points: Point[];

  constructor(
    id: string,
    name: string,
    points: Point[],
    warehouse: IWarehouse,
  ) {
    super(id, name, warehouse);
    this._points = [...points];

    this.warehouse.updateMetrics(this);
    this.warehouse.subscribe(this.id, () => {
      this.warehouse.updateMetrics(this);
    });
  }

  public get points(): Point[] {
    return [...this._points];
  }

  public set points(newPoints: Point[]) {
    this._points = [...newPoints];
    this.notifyWarehouse();
  }

  public updatePoint(index: number, point: Point): void {
    if (index >= 0 && index < this._points.length) {
      this._points[index] = point;
      this.notifyWarehouse();
    }
  }

  public toString(): string {
    return `Rectangle(id: ${this.id}, name: ${this.name}, points: ${this._points.length})`;
  }

  public calculateMetrics(): ShapeMetrics {
    const area = RectangleCalculator.calculateArea(this._points);
    const perimeter = RectangleCalculator.calculatePerimeter(this._points);
    return { area, perimeter };
  }

  public getFirstPoint(): Point {
    return this._points[0];
  }

  public getVertices(): Point[] {
    return this.points;
  }
}
