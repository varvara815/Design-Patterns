import { AbstractShapeFactory } from './AbstractShapeFactory.js';
import { Point } from '../entities/Point.js';
import { Tetrahedron } from '../entities/Tetrahedron.js';
import { DataValidator } from '../validators/DataValidator.js';

export class TetrahedronFactory extends AbstractShapeFactory {
  createShape(id: string, name: string, data: string[]): Tetrahedron {
    const coordinates = this.validateData(data);
    const vertices = [
      new Point(coordinates[0], coordinates[1], coordinates[2]),
      new Point(coordinates[3], coordinates[4], coordinates[5]),
      new Point(coordinates[6], coordinates[7], coordinates[8]),
      new Point(coordinates[9], coordinates[10], coordinates[11]),
    ];
    return new Tetrahedron(id, name, vertices);
  }

  validateData(data: string[]): number[] {
    return DataValidator.parseTetrahedronCoordinates(data);
  }
}
