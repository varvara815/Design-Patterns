import { AbstractShapeFactory } from './AbstractShapeFactory.js';
import { Point } from '../entities/Point.js';
import { Rectangle } from '../entities/Rectangle.js';
import { DataValidator } from '../validators/DataValidator.js';

export class RectangleFactory extends AbstractShapeFactory {
  createShape(id: string, name: string, data: string[]): Rectangle {
    const coordinates = this.validateData(data);
    const points = [
      new Point(coordinates[0], coordinates[1]),
      new Point(coordinates[2], coordinates[3]),
      new Point(coordinates[4], coordinates[5]),
      new Point(coordinates[6], coordinates[7]),
    ];
    return new Rectangle(id, name, points);
  }

  validateData(data: string[]): number[] {
    return DataValidator.parseRectangleCoordinates(data);
  }
}
