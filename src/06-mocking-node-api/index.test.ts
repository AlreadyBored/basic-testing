//Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';

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
    doStuffByTimeout(callback, timeout);
    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;
    doStuffByTimeout(callback, timeout);
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
    doStuffByInterval(callback, interval);
    jest.advanceTimersByTime(interval * 3);
    expect(callback).toHaveBeenCalledTimes(3);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const interval = 1000;
    doStuffByInterval(callback, interval);
    jest.advanceTimersByTime(interval - 1);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
describe('readFileAsynchronously', () => {
  jest.mock('fs');
  jest.mock('path');
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(path, 'join').mockImplementation((...args) => args.join('/'));
  });
  const mockPathToFile = 'test.txt';
  const mockContent = 'file content';
  test.skip('should call join with pathToFile', async () => {
    await readFileAsynchronously(mockPathToFile);
    expect(path.join).toHaveBeenCalledWith(process.cwd(), mockPathToFile);
  });

  test('should return null if file does not exist', async () => {
    const result = await readFileAsynchronously(mockPathToFile);
    expect(result).toBeNull();
  });

  test.skip('should return file content if file exists', async () => {
    const result = await readFileAsynchronously(mockPathToFile);
    expect(result).toBe(mockContent);
  });
});
