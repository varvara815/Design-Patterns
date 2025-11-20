import { ShapeFactory } from '../factories/ShapeFactory.js';
import { logger } from '../utils/logger.js';
import { Shape } from '../entities/Shape.js';

export class LineProcessor {
  static processLine(line: string, lineNumber: number): Shape | null {
    if (!line || line.startsWith('#')) {
      logger.debug(`Line ${lineNumber}: Skipping empty or comment line`);
      return null;
    }

    const parts = line.split(':');
    if (parts.length < 4) {
      throw new Error(
        'Invalid line format. Expected: TYPE:ID:NAME:COORDINATES',
      );
    }

    const [type, id, name, coordinatesStr] = parts;
    const coordinates = coordinatesStr
      .split(' ')
      .filter(coord => coord.trim() !== '');

    logger.debug(`Line ${lineNumber}: Processing ${type} "${name}"`);

    return ShapeFactory.createShape(type, id, name, coordinates);
  }
}
