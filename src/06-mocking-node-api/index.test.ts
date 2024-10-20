// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import { existsSync } from 'fs';
import path from 'path';
import fs from 'fs';
import fs_promises from 'fs/promises';

jest.mock('fs');
jest.mock('fs/promises');

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, 1000);

    expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), 1000);

    setTimeoutSpy.mockRestore();
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);

    jest.advanceTimersByTime(999);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);
    expect(callback).toHaveBeenCalled();
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
    const setIntervalSpy = jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, 1000);

    expect(setIntervalSpy).toHaveBeenCalledWith(callback, 1000);

    setIntervalSpy.mockRestore();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, 1000);

    jest.advanceTimersByTime(5000);
    expect(callback).toHaveBeenCalledTimes(5);
  });
});

describe('readFileAsynchronously', () => {
  const mockExistsSync = jest.spyOn(fs, 'existsSync');
  const mockReadFile = jest.spyOn(fs_promises, 'readFile');

  beforeEach(() => {
    (existsSync as jest.Mock).mockClear();
  });

  test('should call join with pathToFile', async () => {
    const mockFilePath = 'mockFile.txt';
    const joinSpy = jest.spyOn(path, 'join');
    await readFileAsynchronously(mockFilePath);
    expect(joinSpy).toHaveBeenCalledWith(__dirname, mockFilePath);
  });

  test('should return null if file does not exist', async () => {
    const filePath = 'path/to/nonexistent-file.txt';

    mockExistsSync.mockReturnValue(false);

    const result = await readFileAsynchronously(filePath);

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const filePath = 'path/to/file.txt';
    const fileContent = 'Hello, World!';

    mockExistsSync.mockReturnValue(true);
    mockReadFile.mockResolvedValue(Buffer.from(fileContent));

    const result = await readFileAsynchronously(filePath);

    expect(result).toBe(fileContent);
  });
});
