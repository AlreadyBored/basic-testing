// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { join } from 'path';

jest.mock('fs', () => ({
  existsSync: jest.fn(),
}));

jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
}));

jest.mock('path', () => ({
  join: jest.fn(),
}));

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;
    const spySetTimeout = jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, timeout);

    expect(spySetTimeout).toHaveBeenCalledWith(callback, timeout);
    expect(callback).not.toHaveBeenCalled();
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 2000;

    doStuffByTimeout(callback, timeout);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(timeout - 1);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const interval = 1000;
    const spySetInterval = jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, interval);

    expect(spySetInterval).toHaveBeenCalledWith(callback, interval);
    expect(callback).not.toHaveBeenCalled();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const interval = 1000;

    doStuffByInterval(callback, interval);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalledTimes(2);

    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should call join with pathToFile', async () => {
    const mockPath = 'test.txt';
    const mockFullPath = '/mocked/path/test.txt';
    (join as jest.Mock).mockReturnValue(mockFullPath);
    (existsSync as jest.Mock).mockReturnValue(false);

    await readFileAsynchronously(mockPath);

    expect(join).toHaveBeenCalledWith(expect.any(String), mockPath);
  });

  test('should return null if file does not exist', async () => {
    const mockPath = 'non-existent.txt';
    const mockFullPath = '/mocked/path/non-existent.txt';
    (join as jest.Mock).mockReturnValue(mockFullPath);
    (existsSync as jest.Mock).mockReturnValue(false);

    const result = await readFileAsynchronously(mockPath);

    expect(existsSync).toHaveBeenCalledWith(mockFullPath);
    expect(readFile).not.toHaveBeenCalled();
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const mockPath = 'existing.txt';
    const mockFullPath = '/mocked/path/existing.txt';
    const mockContent = Buffer.from('File content here');

    (join as jest.Mock).mockReturnValue(mockFullPath);
    (existsSync as jest.Mock).mockReturnValue(true);
    (readFile as jest.Mock).mockResolvedValue(mockContent);

    const result = await readFileAsynchronously(mockPath);

    expect(existsSync).toHaveBeenCalledWith(mockFullPath);
    expect(readFile).toHaveBeenCalledWith(mockFullPath);
    expect(result).toBe('File content here');
  });
});
