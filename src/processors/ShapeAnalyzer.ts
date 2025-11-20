import { Shape } from '../entities/Shape.js';
import { Rectangle } from '../entities/Rectangle.js';
import { Tetrahedron } from '../entities/Tetrahedron.js';
import { RectangleProcessor } from './RectangleProcessor.js';
import { TetrahedronProcessor } from './TetrahedronProcessor.js';
import { RectangleCalculator } from '../calculators/RectangleCalculator.js';
import { logger } from '../utils/logger.js';

export class ShapeAnalyzer {
  static analyzeShape(shape: Shape, type: string): void {
    try {
      if (type === 'RECTANGLE' && shape instanceof Rectangle) {
        RectangleProcessor.processRectangle(shape);
      } else if (type === 'TETRAHEDRON' && shape instanceof Tetrahedron) {
        TetrahedronProcessor.processTetrahedron(shape);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      logger.error(
        `Error calculating properties for ${type} "${shape.name}": ${errorMessage}`,
      );
      throw error;
    }
  }

  static analyzeRectangle(rectangle: Rectangle): {
    area: number;
    perimeter: number;
    isRectangle: boolean;
    isSquare: boolean;
    isConvex: boolean;
    isRhombus: boolean;
  } {
    const { points } = rectangle;
    const area = RectangleCalculator.calculateArea(points);
    const perimeter = RectangleCalculator.calculatePerimeter(points);
    const isRectangle = RectangleCalculator.isRectangle(points);
    const isSquare = RectangleCalculator.isSquare(points);
    const isConvex = RectangleCalculator.isConvex(points);
    const isRhombus = RectangleCalculator.isRhombus(points);

    return {
      area,
      perimeter,
      isRectangle,
      isSquare,
      isConvex,
      isRhombus,
    };
  }
}
