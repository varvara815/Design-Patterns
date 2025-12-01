import { RectangleFactory } from './RectangleFactory.js';
import { TetrahedronFactory } from './TetrahedronFactory.js';
import { SHAPE_TYPES } from '../utils/constants.js';
import { InvalidShapeDataError } from '../utils/exceptions.js';
import { Shape } from '../entities/Shape.js';
import { AbstractShapeFactory } from './AbstractShapeFactory.js';

export class ShapeFactory {
  static createShape(
    type: string,
    id: string,
    name: string,
    data: string[],
  ): Shape {
    try {
      const factory = this.getFactory(type);
      return factory.createShape(id, name, data);
    } catch (error) {
      if (error instanceof InvalidShapeDataError) {
        throw error;
      }

      const errorMessage =
        error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : undefined;

      const wrappedError = new InvalidShapeDataError(
        `Failed to create ${type} (id: ${id}, name: ${name}): ${errorMessage}`,
      );

      if (errorStack) {
        wrappedError.stack = errorStack;
      }

      throw wrappedError;
    }
  }

  static getFactory(type: string): AbstractShapeFactory {
    switch (type) {
      case SHAPE_TYPES.RECTANGLE:
        return new RectangleFactory();
      case SHAPE_TYPES.TETRAHEDRON:
        return new TetrahedronFactory();
      default:
        throw new InvalidShapeDataError(`Unknown shape type: ${type}`);
    }
  }
}
