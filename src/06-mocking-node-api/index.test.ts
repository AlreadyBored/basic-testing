// Uncomment the code below and write your tests

import { join } from 'path';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const timeoutSpy = jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();

    doStuffByTimeout(callback, 1000);

    expect(timeoutSpy).toHaveBeenCalledWith(callback, 1000);
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
    const setIntervalSpy = jest.spyOn(global, 'setInterval');
    const callback = jest.fn();

    doStuffByInterval(callback, 1000);

    expect(setIntervalSpy).toHaveBeenCalledWith(callback, 1000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();

    doStuffByInterval(callback, 1000);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalled();

    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalled();
  });
});

jest.mock('fs');
jest.mock('fs/promises');
jest.mock('path');

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const joinSpy = jest.mocked(join);
    joinSpy.mockReturnValue('/full/path/to/file.txt');

    jest.mocked(existsSync).mockReturnValue(true);
    jest.mocked(readFile).mockResolvedValue(Buffer.from('test content'));

    await readFileAsynchronously('file.txt');

    expect(joinSpy).toHaveBeenCalledWith(__dirname, 'file.txt');
  });

  test('should return null if file does not exist', async () => {
    const joinSpy = jest.mocked(join);
    joinSpy.mockReturnValue('/full/path/to/file.txt');

    jest.mocked(existsSync).mockReturnValue(false);

    const result = await readFileAsynchronously('no-file.txt');

    expect(result).toBeNull();
    expect(readFile).not.toHaveBeenCalled();
  });

  test('should return file content if file exists', async () => {
    const joinSpy = jest.mocked(join);
    joinSpy.mockReturnValue('/full/path/to/file.txt');

    jest.mocked(existsSync).mockReturnValue(true);

    const fileContent = 'Hello, World !';
    jest.mocked(readFile).mockResolvedValue(fileContent);

    const result = await readFileAsynchronously('file.txt');

    expect(result).toBe('Hello, World !');
    expect(readFile).toHaveBeenCalledWith('/full/path/to/file.txt');
  });
});
