import { existsSync } from 'fs';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import { join } from 'path';
import { readFile } from 'fs/promises';

jest.mock('fs', () => ({
  existsSync: jest.fn(),
}));

jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
}));

jest.mock('path', () => ({
  join: jest.fn(),
}));

describe(doStuffByTimeout.name, () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');

    const fakeFn = jest.fn();

    doStuffByTimeout(fakeFn, 1000);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(fakeFn, 1000);
  });

  test('should call callback only after timeout', () => {
    jest.spyOn(global, 'setTimeout');

    const fakeFn = jest.fn();

    doStuffByTimeout(fakeFn, 1000);

    expect(fakeFn).not.toHaveBeenCalled();

    jest.runAllTimers();

    expect(setTimeout).toHaveBeenCalledWith(fakeFn, 1000);
  });
});

describe(doStuffByInterval.name, () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    const fakeFn = jest.fn();

    doStuffByInterval(fakeFn, 1000);

    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenCalledWith(fakeFn, 1000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const fakeFn = jest.fn();

    doStuffByInterval(fakeFn, 1000);

    expect(fakeFn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(3000);

    expect(fakeFn).toHaveBeenCalledTimes(3);
  });
});

describe(readFileAsynchronously.name, () => {
  test('should call join with pathToFile', async () => {
    const mockPath = 'test.txt';
    const mockFullPath = '/mock/full/path/test.txt';
    (join as jest.Mock).mockReturnValue(mockFullPath);
    (existsSync as jest.Mock).mockReturnValue(false);

    await readFileAsynchronously(mockPath);

    expect(join).toHaveBeenCalledWith(__dirname, mockPath);
  });

  test('should return null if file does not exist', async () => {
    const mockPath = 'nonexistent.txt';
    (existsSync as jest.Mock).mockReturnValue(false);

    const result = await readFileAsynchronously(mockPath);

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const mockPath = 'existing.txt';
    const mockFullPath = '/mock/full/path/existing.txt';
    const mockFileContent = Buffer.from('File content');
    (join as jest.Mock).mockReturnValue(mockFullPath);
    (existsSync as jest.Mock).mockReturnValue(true);
    (readFile as jest.Mock).mockResolvedValue(mockFileContent);

    const result = await readFileAsynchronously(mockPath);

    expect(readFile).toHaveBeenCalledWith(mockFullPath);
    expect(result).toBe('File content');
  });
});
