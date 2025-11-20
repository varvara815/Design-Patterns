import { ApplicationProcessor } from './processors/ApplicationProcessor.js';
import { logger } from './utils/logger.js';

async function main(): Promise<void> {
  try {
    // Use command line argument or default input file
    const filePath = process.argv[2] || './data/input.txt';
    await ApplicationProcessor.processFile(filePath);
    logger.info('Application finished successfully');
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message.replace(/[\r\n\t]/g, ' ')
        : 'Unknown error';
    logger.error('Application failed', { error: message });
    process.exit(1);
  }
}

main();
