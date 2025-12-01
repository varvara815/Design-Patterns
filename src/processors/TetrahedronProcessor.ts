import { Tetrahedron } from '../entities/Tetrahedron.js';
import { TetrahedronCalculator } from '../calculators/TetrahedronCalculator.js';
import { logger } from '../utils/logger.js';
import { COORDINATE_PLANES } from '../utils/constants.js';

export class TetrahedronProcessor {
  static processTetrahedron(tetrahedron: Tetrahedron): void {
    try {
      const vertices = tetrahedron.getVertices();
      const surfaceArea = TetrahedronCalculator.calculateSurfaceArea(vertices);
      const volume = TetrahedronCalculator.calculateVolume(vertices);
      const isValid = TetrahedronCalculator.isTetrahedron(vertices);
      const basePlane = TetrahedronCalculator.findBasePlane(vertices);
      const volumeRatios = TetrahedronCalculator.calculatePlaneVolumeRatio(
        vertices,
        basePlane || COORDINATE_PLANES.XY,
      );

      logger.info('Tetrahedron analysis completed', {
        name: tetrahedron.name,
        id: tetrahedron.id,
        surfaceArea: surfaceArea.toFixed(2),
        volume: volume.toFixed(2),
        isValid,
        basePlane: basePlane || 'None',
        volumeRatios: {
          above: volumeRatios.abovePlane.toFixed(2),
          below: volumeRatios.belowPlane.toFixed(2),
        },
      });
    } catch (error) {
      logger.error('Error processing tetrahedron', {
        tetrahedronId: tetrahedron.id,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  }
}
