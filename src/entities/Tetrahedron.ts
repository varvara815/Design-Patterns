import { Shape } from './Shape.js';
import { Point } from './Point.js';

export class Tetrahedron extends Shape {
  constructor(
    id: string,
    name: string,
    public vertices: Point[],
  ) {
    super(id, name);
  }

  getVertices(): Point[] {
    return [...this.vertices];
  }

  toString(): string {
    return `Tetrahedron(id: ${this.id}, name: ${this.name}, vertices: ${this.vertices.length})`;
  }
}
