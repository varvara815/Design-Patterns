import { Rectangle } from '../entities/Rectangle.js';
import { RectangleCalculator } from '../calculators/RectangleCalculator.js';
import { logger } from '../utils/logger.js';

export class RectangleProcessor {
  static processRectangle(rectangle: Rectangle): void {
    try {
      const points = rectangle.getPoints();
      const area = RectangleCalculator.calculateArea(points);
      const perimeter = RectangleCalculator.calculatePerimeter(points);
      const isValid = RectangleCalculator.isRectangle(points);
      const isSquare = RectangleCalculator.isSquare(points);
      const isRhombus = RectangleCalculator.isRhombus(points);
      const isTrapezoid = RectangleCalculator.isTrapezoid(points);
      const isConvex = RectangleCalculator.isConvex(points);

      logger.info('Rectangle analysis completed', {
        name: rectangle.name,
        id: rectangle.id,
        area: area.toFixed(2),
        perimeter: perimeter.toFixed(2),
        properties: { isValid, isConvex, isSquare, isRhombus, isTrapezoid },
      });
    } catch (error) {
      logger.error('Error processing rectangle', {
        rectangleId: rectangle.id,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  }
}
