import { Shape } from './Shape.js';
import { Point } from './Point.js';

export class Rectangle extends Shape {
  constructor(
    id: string,
    name: string,
    public points: Point[],
  ) {
    super(id, name);
  }

  getPoints(): Point[] {
    return [...this.points];
  }

  toString(): string {
    return `Rectangle(id: ${this.id}, name: ${this.name}, points: ${this.points.length})`;
  }
}
