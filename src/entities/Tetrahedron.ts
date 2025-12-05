import { Shape } from './Shape.js';
import { Point } from './Point.js';
import { ShapeMetrics, IWarehouse } from '../warehouse/Warehouse.js';
import { TetrahedronCalculator } from '../calculators/TetrahedronCalculator.js';

export class Tetrahedron extends Shape {
  private _vertices: Point[];

  constructor(
    id: string,
    name: string,
    vertices: Point[],
    warehouse: IWarehouse,
  ) {
    super(id, name, warehouse);
    this._vertices = [...vertices];

    this.warehouse.updateMetrics(this);
    this.warehouse.subscribe(this.id, () => {
      this.warehouse.updateMetrics(this);
    });
  }

  public get vertices(): Point[] {
    return [...this._vertices];
  }

  public set vertices(newVertices: Point[]) {
    this._vertices = [...newVertices];
    this.notifyWarehouse();
  }

  public updateVertex(index: number, vertex: Point): void {
    if (index >= 0 && index < this._vertices.length) {
      this._vertices[index] = vertex;
      this.notifyWarehouse();
    }
  }

  public getVertices(): Point[] {
    return [...this._vertices];
  }

  public toString(): string {
    return `Tetrahedron(id: ${this.id}, name: ${this.name}, vertices: ${this._vertices.length})`;
  }

  public calculateMetrics(): ShapeMetrics {
    const volume = TetrahedronCalculator.calculateVolume(this._vertices);
    const surfaceArea = TetrahedronCalculator.calculateSurfaceArea(
      this._vertices,
    );
    return { volume, surfaceArea };
  }

  public getFirstPoint(): Point {
    return this._vertices[0];
  }
}
