export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class InvalidShapeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidShapeError';
  }
}

export class InvalidShapeDataError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidShapeDataError';
  }
}

export class FileProcessingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FileProcessingError';
  }
}

export class CalculationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CalculationError';
  }
}
