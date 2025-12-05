export interface ShapeMetrics {
  area?: number;
  perimeter?: number;
  volume?: number;
  surfaceArea?: number;
}

export interface ShapeInterface {
  id: string;
  calculateMetrics(): ShapeMetrics;
}

export interface IWarehouse {
  updateMetrics(shape: ShapeInterface): void;
  notify(shape: ShapeInterface): void;
  subscribe(shapeId: string, callback: (shape: ShapeInterface) => void): void;
  removeShape(shapeId: string): void;
}

export class Warehouse implements IWarehouse {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  private static instance: Warehouse | null = null;

  private metrics: Map<string, ShapeMetrics> = new Map();

  private observers: Map<string, (shape: ShapeInterface) => void> = new Map();

  private constructor() {}

  public static getInstance(): Warehouse {
    if (!Warehouse.instance) {
      Warehouse.instance = new Warehouse();
    }
    return Warehouse.instance;
  }

  public subscribe(
    shapeId: string,
    callback: (shape: ShapeInterface) => void,
  ): void {
    this.observers.set(shapeId, callback);
  }

  public unsubscribe(shapeId: string): void {
    this.observers.delete(shapeId);
  }

  public notify(shape: ShapeInterface): void {
    const callback = this.observers.get(shape.id);
    if (callback) {
      callback(shape);
    }
  }

  public updateMetrics(shape: ShapeInterface): void {
    if (shape.calculateMetrics) {
      const metrics = shape.calculateMetrics();
      this.metrics.set(shape.id, metrics);
    }
  }

  public getMetrics(shapeId: string): ShapeMetrics | undefined {
    return this.metrics.get(shapeId);
  }

  public getAllMetrics(): Map<string, ShapeMetrics> {
    return new Map(this.metrics);
  }

  public removeShape(shapeId: string): void {
    this.metrics.delete(shapeId);
    this.observers.delete(shapeId);
  }

  public clear(): void {
    this.metrics.clear();
    this.observers.clear();
  }
}

export const warehouse = Warehouse.getInstance();
