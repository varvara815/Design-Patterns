import { readFile } from 'fs/promises';
import { logger } from '../utils/logger.js';
import { FileProcessingError } from '../utils/exceptions.js';

export class FileReader {
  static async readLines(filePath: string): Promise<string[]> {
    try {
      const data = await readFile(filePath, 'utf8');
      return data
        .split('\n')
        .map((line: string) => line.trim())
        .filter((line: string) => line && !line.startsWith('#'));
    } catch (error) {
      if (error instanceof Error) {
        throw new FileProcessingError(`Error reading file: ${error.message}`);
      }
      throw new FileProcessingError('Error reading file: Unknown error');
    }
  }

  static async processFile(filePath: string): Promise<string[]> {
    logger.info(`Processing file: ${filePath}`);
    const lines = await this.readLines(filePath);
    logger.info(`Found ${lines.length} lines`);
    return lines;
  }
}
