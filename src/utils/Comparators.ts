import { Shape } from '../entities/Shape.js';

export interface Comparator<T> {
  compare(a: T, b: T): number;
}

export class IdComparator implements Comparator<Shape> {
  compare(a: Shape, b: Shape): number {
    const idA = parseInt(a.id, 10);
    const idB = parseInt(b.id, 10);
    return idA - idB;
  }
}

export class NameComparator implements Comparator<Shape> {
  compare(a: Shape, b: Shape): number {
    return a.name.localeCompare(b.name);
  }
}

export class FirstPointXComparator implements Comparator<Shape> {
  compare(a: Shape, b: Shape): number {
    return a.getFirstPoint().x - b.getFirstPoint().x;
  }
}

export class FirstPointYComparator implements Comparator<Shape> {
  compare(a: Shape, b: Shape): number {
    return a.getFirstPoint().y - b.getFirstPoint().y;
  }
}

export class ShapeComparators {
  static readonly byId = new IdComparator();

  static readonly byName = new NameComparator();

  static readonly byFirstPointX = new FirstPointXComparator();

  static readonly byFirstPointY = new FirstPointYComparator();

  static byIdFn = (a: Shape, b: Shape): number =>
    ShapeComparators.byId.compare(a, b);

  static byNameFn = (a: Shape, b: Shape): number =>
    ShapeComparators.byName.compare(a, b);

  static byFirstPointXFn = (a: Shape, b: Shape): number =>
    ShapeComparators.byFirstPointX.compare(a, b);

  static byFirstPointYFn = (a: Shape, b: Shape): number =>
    ShapeComparators.byFirstPointY.compare(a, b);
}
