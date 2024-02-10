// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';
import fs, { promises } from 'fs';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const setTimeout = jest.spyOn(global, 'setTimeout');
    const timeout = 1;
    const callback = jest.fn();

    doStuffByTimeout(callback, timeout);
    expect(setTimeout).toHaveBeenLastCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    const timeout = 1;
    const callback = jest.fn();

    doStuffByTimeout(callback, timeout);
    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(timeout);
    expect(callback).toBeCalled();
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
    const setInterval = jest.spyOn(global, 'setInterval');
    const timeout = 1;
    const callback = jest.fn();

    doStuffByInterval(callback, timeout);
    expect(setInterval).toHaveBeenLastCalledWith(callback, timeout);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const interval = 1;
    const times = 2;
    const callback = jest.fn(() => null);

    doStuffByInterval(callback, interval);
    expect(callback).not.toBeCalled();
    jest.advanceTimersToNextTimer(times);
    expect(callback).toBeCalledTimes(times);
  });
});

describe('readFileAsynchronously', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should call join with pathToFile', async () => {
    const pathToFile = './my-fi.le';

    const join = jest.spyOn(path, 'join');
    join.mockImplementation((value) => value);

    try {
      await readFileAsynchronously(pathToFile);
    } catch {}

    expect(join).toHaveBeenCalledWith(expect.any(String), pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = './my-fi.le';
    const existsSync = jest.spyOn(fs, 'existsSync');
    const join = jest.spyOn(path, 'join');
    join.mockImplementation((_, value) => value);

    existsSync.mockReturnValue(false);

    return await expect(readFileAsynchronously(pathToFile)).resolves.toBeNull();
  });

  test('should return file content if file exists', async () => {
    const content = 'My content';
    const pathToFile = './my-fi.le';

    const join = jest.spyOn(path, 'join');
    const existsSync = jest.spyOn(fs, 'existsSync');
    const readFile = jest.spyOn(promises, 'readFile');

    join.mockImplementation((_, value) => value);

    existsSync.mockReturnValue(true);

    readFile.mockResolvedValue(content);

    return await expect(readFileAsynchronously(pathToFile)).resolves.toBe(
      content,
    );
  });
});
