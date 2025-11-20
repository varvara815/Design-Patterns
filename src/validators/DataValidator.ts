import { ValidationError } from '../utils/exceptions.js';

// Pattern for valid number format (optional minus, digits, optional decimal part)
const NUMBER_PATTERN = /^-?\d+(\.\d+)?$/;

export class DataValidator {
  static validateNumber(value: string): number {
    if (!NUMBER_PATTERN.test(value)) {
      throw new ValidationError('Invalid number format');
    }
    const num = parseFloat(value);
    if (!Number.isFinite(num)) {
      throw new ValidationError('Invalid number format');
    }
    return num;
  }

  static parseRectangleCoordinates(data: string[]): number[] {
    if (data.length < 8) {
      throw new ValidationError('Rectangle requires 8 coordinates');
    }
    return data.slice(0, 8).map(coord => this.validateNumber(coord));
  }

  static parseTetrahedronCoordinates(data: string[]): number[] {
    if (data.length < 12) {
      throw new ValidationError('Tetrahedron requires 12 coordinates');
    }
    return data.slice(0, 12).map(coord => this.validateNumber(coord));
  }
}
