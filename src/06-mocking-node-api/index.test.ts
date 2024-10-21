import path from 'path';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const cb = jest.fn(() => {});
  const timeout = 1000;

  test('should set timeout with provided callback and timeout', () => {
    const setTimeout = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(cb, timeout);
    expect(setTimeout).toHaveBeenCalledWith(cb, timeout);
  });

  test('should call callback only after timeout', () => {
    expect(cb).not.toHaveBeenCalled();
    jest.runAllTimers();
    expect(cb).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const cb = jest.fn(() => {});
  const interval = 1000;

  test('should set interval with provided callback and timeout', () => {
    const setInterval = jest.spyOn(global, 'setInterval');
    doStuffByInterval(cb, interval);
    expect(setInterval).toHaveBeenCalledWith(cb, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    expect(cb).not.toHaveBeenCalled();
    jest.runOnlyPendingTimers();
    expect(cb).toHaveBeenCalledTimes(1);
    jest.runOnlyPendingTimers();
    expect(cb).toHaveBeenCalledTimes(2);
    jest.runOnlyPendingTimers();
    expect(cb).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const joinSpy = jest.spyOn(path, 'join');
    const pathToFile = "input.txt";
    await readFileAsynchronously(pathToFile);
    expect(joinSpy).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = "nonexisting.txt";
    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const pathToFile = "test.txt";
    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBe("okay");
  });
});