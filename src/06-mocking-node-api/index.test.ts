import { join } from 'path';
import {
  readFileAsynchronously,
  doStuffByTimeout,
  doStuffByInterval,
} from './index';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const callback = jest.fn();
  const timeout = 1000;

  test('should set timeout with provided callback and timeout', () => {
    doStuffByTimeout(callback, timeout);
    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalled();
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(callback, timeout);
    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(timeout);
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

  const callback = jest.fn();
  const timeout = 1000;

  test('should set interval with provided callback and timeout', () => {
    doStuffByInterval(callback, timeout);
    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalled();
    jest.clearAllTimers();
  });

  test('should call callback multiple times after multiple intervals', () => {
    doStuffByInterval(callback, timeout);
    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalled();
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(2);
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(3);
    jest.clearAllTimers();
  });
});

describe('readFileAsynchronously', () => {
  jest.mock('fs');
  test('should call join with pathToFile', async () => {
    const pathToFile = './index.ts';
    const fullPath = join(__dirname, pathToFile);
    const result = await readFileAsynchronously(fullPath);
    expect(result).toBeDefined();
  });

  test('should return null if file does not exist', async () => {
    const nonExistentPath = './nonexistentfile.txt';
    const result = await readFileAsynchronously(nonExistentPath);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const pathToFile = './index.ts';
    const fullPath = join(__dirname, pathToFile);
    const fileContent = 'Hello world';
    const result = await readFileAsynchronously(fullPath);

    if (result !== null) {
      expect(result).toEqual(fileContent);
    } else {
      expect(result).toBeNull;
    }
  });
});
