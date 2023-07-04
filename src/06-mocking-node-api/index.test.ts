import fs from 'fs';
import * as fsPromises from 'fs/promises';
import { join } from 'path';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const timer = jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();

    doStuffByTimeout(callback, 1000);

    jest.runAllTimers();
    expect(timer).toHaveBeenCalledTimes(1);
  }, 30000);

  test('should call callback only after timeout', () => {
    const callback = jest.fn();

    doStuffByTimeout(callback, 1000);

    jest.runAllTimers();
    expect(callback).toHaveBeenCalled();
    jest.useRealTimers();
  }, 30000);
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const interval = jest.spyOn(global, 'setInterval');
    const callback = jest.fn();

    doStuffByInterval(callback, 1000);

    expect(interval).toHaveBeenCalledWith(callback, 1000);
    interval.mockRestore();
  }, 30000);

  test('should call callback multiple times after multiple intervals', () => {
    const interval = jest.spyOn(global, 'setInterval');
    const callback = jest.fn();

    doStuffByInterval(callback, 1000);

    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1000);

    expect(callback).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(1000);

    expect(callback).toHaveBeenCalledTimes(2);
    jest.advanceTimersByTime(1000 * 3);

    expect(callback).toHaveBeenCalledTimes(5);
    interval.mockRestore();
  }, 30000);
});

jest.mock('path');
jest.mock('fs');
jest.mock('fs/promises');

describe('readFileAsynchronously', () => {
  const pathToFile = 'test.txt';
  test('should call join with pathToFile', async () => {
    await readFileAsynchronously(pathToFile);

    expect(join).toHaveBeenCalledWith(__dirname, pathToFile);
  }, 30000);

  test('should return null if file does not exist', async () => {
    const nonExistentFile = await readFileAsynchronously(pathToFile);

    expect(nonExistentFile).toBeNull();
  }, 30000);

  test('should return file content if file exists', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(true);

    jest.spyOn(fsPromises, 'readFile').mockResolvedValueOnce('content');

    const content = await readFileAsynchronously('test.txt');
    expect(content).toBe('content');
  }, 30000);
});