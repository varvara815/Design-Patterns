import { Shape } from '../entities/Shape.js';
import { Specification } from './Specification';
import { warehouse } from '../warehouse/Warehouse.js';
import { Comparator } from '../utils/Comparators.js';

export class ShapeRepository {
  private shapes: Shape[] = [];

  add(shape: Shape): void {
    this.shapes.push(shape);
  }

  remove(shape: Shape): boolean {
    const index = this.shapes.indexOf(shape);
    if (index > -1) {
      this.shapes.splice(index, 1);
      warehouse.removeShape(shape.id);
      return true;
    }
    return false;
  }

  removeById(id: string): boolean {
    const index = this.shapes.findIndex(s => s.id === id);
    if (index > -1) {
      this.shapes.splice(index, 1);
      warehouse.removeShape(id);
      return true;
    }
    return false;
  }

  getAll(): Shape[] {
    return [...this.shapes];
  }

  getById(id: string): Shape | undefined {
    return this.shapes.find(s => s.id === id);
  }

  getByName(name: string): Shape[] {
    return this.shapes.filter(s => s.name === name);
  }

  query(specification: Specification<Shape>): Shape[] {
    return this.shapes.filter(shape => specification.isSatisfiedBy(shape));
  }

  sort(comparator: Comparator<Shape>): Shape[] {
    return [...this.shapes].sort((a, b) => comparator.compare(a, b));
  }

  sortBy(compareFn: (a: Shape, b: Shape) => number): Shape[] {
    return [...this.shapes].sort(compareFn);
  }
}
