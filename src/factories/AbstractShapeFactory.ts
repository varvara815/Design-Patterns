import { Shape } from '../entities/Shape.js';

export interface IShapeFactory {
  createShape(id: string, name: string, data: string[]): Shape;
  validateData(data: string[]): number[];
}

export abstract class AbstractShapeFactory implements IShapeFactory {
  abstract createShape(id: string, name: string, data: string[]): Shape;

  abstract validateData(data: string[]): number[];
}
