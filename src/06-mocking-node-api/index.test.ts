// Uncomment the code below and write your tests
jest.mock('path', () => {
  const actualPath = jest.requireActual('path');
  return {
    ...actualPath,
    join: jest.fn(actualPath.join),
  };
});

const readFileMock = jest.fn();

jest.mock('fs/promises', () => ({
  readFile: readFileMock,
}));

const existsSyncMock = jest.fn();

jest.mock('fs', () => ({
  existsSync: existsSyncMock,
}));

import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import * as path from 'path';

describe('doStuffByTimeout', () => {
  let callback: jest.Mock;
  const timeout = 5000;

  beforeAll(() => {
    jest.useFakeTimers();
    callback = jest.fn();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const spy = jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, timeout);

    expect(spy).toHaveBeenCalledWith(callback, timeout);
    spy.mockRestore();
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(callback, timeout);

    jest.advanceTimersByTime(4500);
    expect(callback).not.toHaveBeenCalled();
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
    const interval = 3000;

    const spy = jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, interval);

    expect(spy).toHaveBeenCalledWith(callback, interval);
    spy.mockRestore();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const interval = 3000;

    doStuffByInterval(callback, interval);

    jest.advanceTimersByTime(9000);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  let pathSpy: jest.SpyInstance;

  beforeEach(() => {
    pathSpy = jest.spyOn(path, 'join');
  });

  afterEach(() => {
    pathSpy.mockRestore();
    jest.clearAllMocks();
  });

  test('should call join with pathToFile', async () => {
    existsSyncMock.mockReturnValue(false);
    await readFileAsynchronously('test.txt');
    expect(pathSpy).toHaveBeenCalledWith(__dirname, 'test.txt');
  });

  test('should return null if file does not exist', async () => {
    existsSyncMock.mockReturnValue(false);
    const result = await readFileAsynchronously('test.txt');
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const expectedContent = 'Hello!:)';
    pathSpy.mockReturnValue('/mock/path/test.txt');
    existsSyncMock.mockReturnValue(true);
    readFileMock.mockResolvedValue(expectedContent);
    const result = await readFileAsynchronously('test.txt');
    expect(result).toBe(expectedContent);
  });
});
