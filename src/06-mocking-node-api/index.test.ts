import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';

describe('doStuffByTimeout', () => {
  const callback = jest.fn();

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    doStuffByTimeout(callback, 0);
    expect(jest.setTimeout).toBeDefined();
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(callback, 0);
    jest.runAllTimers();
    expect(callback).toBeCalled();
  });
});

describe('doStuffByInterval', () => {
  const callback = jest.fn();
  const interval = 10;

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    doStuffByInterval(callback, interval);
    expect(jest.advanceTimersByTime).toBeDefined();
  });

  test('should call callback multiple times after multiple intervals', () => {
    doStuffByInterval(callback, interval);
    expect(callback).toBeCalledTimes(0);
    // jest.runAllTimers();
    jest.advanceTimersByTime(interval * 3);
    expect(callback).toBeCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const joinSpy = jest.spyOn(path, 'join');
    await readFileAsynchronously('unknownPathToFile');
    expect(joinSpy).toBeCalled();
    joinSpy.mockRestore();
  });

  test('should return null if file does not exist', async () => {
    expect(await readFileAsynchronously('unknownPathToFile')).toBeNull();
  });

  test('should return file content if file exists', async () => {
    expect(await readFileAsynchronously('./index.ts')).not.toBeFalsy();
  });
});
