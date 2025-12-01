# Design Patterns Homework

A TypeScript project implementing design patterns for geometric shapes (Rectangle and Tetrahedron) with comprehensive validation, calculation, and analysis capabilities.

## Project Structure

```
src/
├── entities/          # Entity classes without business logic
├── factories/         # Factory Method pattern implementation
├── calculators/       # Business logic for calculations
├── validators/        # Data validation classes
├── processors/        # File and data processing
└── utils/            # Utilities, constants, exceptions

data/                 # Input data files
tests/                # Unit tests organized by modules
├── entities/         # Entity tests
├── calculators/      # Calculator tests
├── factories/        # Factory tests
├── validators/       # Validator tests
├── processors/       # Processor tests
└── utils/           # Utility tests
logs/                 # Application logs
```

## Features

### Rectangle
- Area and perimeter calculation
- Point validation for rectangle formation
- Shape type identification: square, rhombus, trapezoid
- Convexity checking
- Self-intersection detection

### Tetrahedron
- Volume and surface area calculation
- Volume ratio calculation when intersected by coordinate planes
- Base plane detection on coordinate planes
- Tetrahedron validity verification

## Installation & Usage

```bash
# Install dependencies
pnpm install

# Build project
pnpm run build

# Run application
pnpm start

# Development mode
pnpm run dev

# Run tests
pnpm test
pnpm run test:coverage

# Code quality
pnpm run lint
pnpm run format
```

## Technology Stack

- **TypeScript** - Static typing and modern JavaScript features
- **Jest** - Testing framework with coverage reporting
- **ESLint + Prettier** - Code quality and formatting
- **Pino** - High-performance logging to console and file
- **Factory Method Pattern** - Object creation abstraction

## Input Data Format

```
RECTANGLE:id:name:x1 y1 x2 y2 x3 y3 x4 y4
TETRAHEDRON:id:name:x1 y1 z1 x2 y2 z2 x3 y3 z3 x4 y4 z4
```

### Example Input File
```
RECTANGLE:1:PerfectRectangle:0 0 0 3 4 3 4 0
RECTANGLE:2:Square:0 0 0 5 5 5 5 0
TETRAHEDRON:3:StandardTetrahedron:0 0 0 1 0 0 0 1 0 0 0 1

# Invalid data examples (will be skipped)
RECTANGLE:4:BadRect:0 0 0 3a 4 3 4 0  # Invalid character
RECTANGLE:5:Incomplete:0 0 0 3        # Insufficient coordinates
```

## Architecture Highlights

- **Separation of Concerns**: Entity classes contain only data, business logic in separate calculators
- **Factory Method Pattern**: Abstracted shape creation with type-specific factories
- **Custom Exceptions**: Specific error types for different failure scenarios
- **Robust Validation**: Input data validation with graceful error handling
- **Comprehensive Logging**: Structured logging to both console and file
- **Full Test Coverage**: Unit tests for all components with multiple assertions
- **Type Safety**: Leverages TypeScript's static typing throughout

## Error Handling

The application gracefully handles:
- Invalid number formats in input data
- Insufficient coordinate data
- Malformed input lines
- File reading errors
- Geometric validation failures

Invalid lines are logged and skipped, allowing processing to continue with valid data.