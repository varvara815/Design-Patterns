export class Point {
  constructor(
    public readonly x: number,
    public readonly y: number,
    public readonly z: number = 0,
  ) {}

  equals(other: Point): boolean {
    return this.x === other.x && this.y === other.y && this.z === other.z;
  }

  toString(): string {
    return `Point(${this.x}, ${this.y}, ${this.z})`;
  }
}
