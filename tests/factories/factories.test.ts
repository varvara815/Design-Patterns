import { RectangleFactory } from '../../src/factories/RectangleFactory';
import { TetrahedronFactory } from '../../src/factories/TetrahedronFactory';
import { ShapeFactory } from '../../src/factories/ShapeFactory';
import { Rectangle } from '../../src/entities/Rectangle';
import { Tetrahedron } from '../../src/entities/Tetrahedron';
import { InvalidShapeDataError } from '../../src/utils/exceptions';

describe('Factories', () => {
  test('Factory creation and validation', () => {
    const rectangleFactory = new RectangleFactory();
    const tetrahedronFactory = new TetrahedronFactory();

    const rectangleData = ['0', '0', '0', '3', '4', '3', '4', '0'];
    const tetrahedronData = [
      '0',
      '0',
      '0',
      '1',
      '0',
      '0',
      '0',
      '1',
      '0',
      '0',
      '0',
      '1',
    ];

    const rectangle = rectangleFactory.createShape('1', 'Test', rectangleData);
    const tetrahedron = tetrahedronFactory.createShape(
      '1',
      'Test',
      tetrahedronData,
    );

    expect(rectangle).toBeInstanceOf(Rectangle);
    expect(tetrahedron).toBeInstanceOf(Tetrahedron);
    expect(rectangleFactory.validateData(rectangleData)).toEqual([
      0, 0, 0, 3, 4, 3, 4, 0,
    ]);
    expect(tetrahedronFactory.validateData(tetrahedronData)).toEqual([
      0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1,
    ]);
  });

  test('ShapeFactory operations', () => {
    const rectangleData = ['0', '0', '0', '3', '4', '3', '4', '0'];
    const tetrahedronData = [
      '0',
      '0',
      '0',
      '1',
      '0',
      '0',
      '0',
      '1',
      '0',
      '0',
      '0',
      '1',
    ];

    const rectangle = ShapeFactory.createShape(
      'RECTANGLE',
      '1',
      'TestRect',
      rectangleData,
    );
    const tetrahedron = ShapeFactory.createShape(
      'TETRAHEDRON',
      '2',
      'TestTetra',
      tetrahedronData,
    );

    expect(rectangle).toBeInstanceOf(Rectangle);
    expect(rectangle.id).toBe('1');
    expect(tetrahedron).toBeInstanceOf(Tetrahedron);
    expect(tetrahedron.id).toBe('2');

    expect(() => ShapeFactory.createShape('UNKNOWN', '1', 'Test', [])).toThrow(
      InvalidShapeDataError,
    );
    expect(() =>
      ShapeFactory.createShape('RECTANGLE', '1', 'Test', ['1', '2']),
    ).toThrow(InvalidShapeDataError);
  });
});
