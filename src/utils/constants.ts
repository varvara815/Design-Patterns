export const SHAPE_TYPES = {
  RECTANGLE: 'RECTANGLE',
  TETRAHEDRON: 'TETRAHEDRON',
} as const;

export const EPSILON = 1e-10;

export const COORDINATE_PLANES = {
  XY: 'XY',
  XZ: 'XZ',
  YZ: 'YZ',
} as const;

export type ShapeType = (typeof SHAPE_TYPES)[keyof typeof SHAPE_TYPES];
export type CoordinatePlane =
  (typeof COORDINATE_PLANES)[keyof typeof COORDINATE_PLANES];
