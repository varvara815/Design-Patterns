import { ApplicationProcessor } from './processors/ApplicationProcessor.js';
import { logger } from './utils/logger.js';
import { ShapeRepository } from './repositories/ShapeRepository.js';

async function main(): Promise<void> {
  try {
    // Use command line argument or default input file
    const filePath = process.argv[2] || './data/input.txt';

    // Process file and get shapes
    const processor = new ApplicationProcessor();
    const result = await processor.processFile(filePath);

    // Log processing results
    logger.info(
      `Processing completed: ${result.rectangles.length} rectangles, ${result.tetrahedrons.length} tetrahedrons, ${result.errors.length} errors`,
    );

    // Create repository and add all shapes
    const repository = new ShapeRepository();

    result.rectangles.forEach(rect => repository.add(rect));
    result.tetrahedrons.forEach(tet => repository.add(tet));

    // Demonstrate repository capabilities
    logger.info(`Total shapes in repository: ${repository.getAll().length}`);

    // Show actual shape names and their metrics
    repository.getAll().forEach((shape, index) => {
      const metrics = shape.calculateMetrics();
      logger.info(`Shape ${index + 1}: ${shape.toString()}`);
      logger.info(`  Metrics:`, metrics);
    });

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
