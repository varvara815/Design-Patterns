import { FileReader } from './FileReader.js';
import { LineProcessor } from './LineProcessor.js';
import { ShapeAnalyzer } from './ShapeAnalyzer.js';
import { Rectangle } from '../entities/Rectangle.js';
import { Tetrahedron } from '../entities/Tetrahedron.js';
import { logger } from '../utils/logger.js';

export class ApplicationProcessor {
  static async processFile(filePath: string): Promise<void> {
    const lines = await FileReader.processFile(filePath);
    let processedCount = 0;
    let errorCount = 0;

    for (const [index, line] of lines.entries()) {
      try {
        const shape = LineProcessor.processLine(line, index + 1);
        if (shape) {
          const type = line.split(':')[0];
          ShapeAnalyzer.analyzeShape(shape, type);
          processedCount += 1;
        }
      } catch (error) {
        errorCount += 1;
        if (error instanceof Error) {
          logger.warn(`Line ${index + 1}: ${error.message}`);
        } else {
          logger.warn(`Line ${index + 1}: Unknown error`);
        }
      }
    }

    logger.info(
      `Processing completed: ${processedCount} successful, ${errorCount} errors`,
    );
  }

  async processFile(filePath: string): Promise<{
    rectangles: Rectangle[];
    tetrahedrons: Tetrahedron[];
    errors: string[];
  }> {
    const lines = await FileReader.processFile(filePath);
    const rectangles: Rectangle[] = [];
    const tetrahedrons: Tetrahedron[] = [];
    const errors: string[] = [];

    for (const [index, line] of lines.entries()) {
      try {
        const shape = LineProcessor.processLine(line, index + 1);
        if (shape) {
          if (shape instanceof Rectangle) {
            rectangles.push(shape);
          } else if (shape instanceof Tetrahedron) {
            tetrahedrons.push(shape);
          }
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Unknown error';
        errors.push(`Line ${index + 1}: ${errorMessage}`);
      }
    }

    return { rectangles, tetrahedrons, errors };
  }
}
