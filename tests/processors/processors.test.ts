import { FileReader } from '../../src/processors/FileReader';
import { LineProcessor } from '../../src/processors/LineProcessor';
import { ApplicationProcessor } from '../../src/processors/ApplicationProcessor';
import { FileProcessingError } from '../../src/utils/exceptions';
import { Rectangle } from '../../src/entities/Rectangle';
import { readFile } from 'fs/promises';

jest.mock('fs/promises');
const mockReadFile = readFile as jest.MockedFunction<typeof readFile>;

describe('Processors', () => {
  test('File reading operations', async () => {
    mockReadFile.mockResolvedValue('line1\nline2\n# comment\n\nline3');
    const result = await FileReader.readLines('test.txt');
    expect(result).toEqual(['line1', 'line2', 'line3']);

    mockReadFile.mockRejectedValue(new Error('File not found'));
    await expect(FileReader.readLines('test.txt')).rejects.toThrow(
      FileProcessingError,
    );

    mockReadFile.mockResolvedValue('line1\nline2');
    const processResult = await FileReader.processFile('test.txt');
    expect(processResult).toEqual(['line1', 'line2']);
  });

  test('Line processing operations', () => {
    const validLine = 'RECTANGLE:1:Test:0 0 0 3 4 3 4 0';
    const spacedLine = 'RECTANGLE:1:Test:0  0  0  3  4  3  4  0';

    const result = LineProcessor.processLine(validLine, 1);
    expect(result).toBeInstanceOf(Rectangle);
    expect(result?.id).toBe('1');

    expect(LineProcessor.processLine('', 1)).toBeNull();
    expect(LineProcessor.processLine('# comment', 1)).toBeNull();
    expect(() => LineProcessor.processLine('invalid', 1)).toThrow();
    expect(LineProcessor.processLine(spacedLine, 1)).toBeInstanceOf(Rectangle);
  });

  test('Application processing', async () => {
    // Mock valid file content for testing
    mockReadFile.mockResolvedValue(
      'RECTANGLE:1:Test1:0 0 0 3 4 3 4 0\n' +
        'RECTANGLE:2:Test2:0 0 5 0 5 5 0 5\n' +
        'RECTANGLE:3:Test3:1 1 1 4 4 4 4 1\n' +
        'TETRAHEDRON:4:Test4:0 0 0 1 0 0 0 1 0 0 0 1\n' +
        'INVALID:5:Test5:invalid data\n' +
        'RECTANGLE:6:Test6:1 2\n' +
        'UNKNOWN:7:Test7:1 2 3 4\n' +
        '# comment line',
    );

    const processor = new ApplicationProcessor();
    const result = await processor.processFile('./data/input.txt');
    expect(result.rectangles).toHaveLength(3);
    expect(result.tetrahedrons).toHaveLength(1);
    expect(result.errors).toHaveLength(3);

    mockReadFile.mockRejectedValue(new Error('File not found'));
    await expect(processor.processFile('./nonexistent.txt')).rejects.toThrow(
      FileProcessingError,
    );
  });
});
