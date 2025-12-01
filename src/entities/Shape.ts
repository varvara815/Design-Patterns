export abstract class Shape {
  constructor(
    public id: string,
    public name: string,
  ) {}

  abstract toString(): string;
}
