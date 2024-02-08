// Uncomment the code below and write your tests
import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';

import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';

describe('doStuffByTimeout', () => {
  const callback = jest.fn();
  const timeout = 10000;

  let mockedSetTimeout: jest.SpyInstance;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    mockedSetTimeout = jest.spyOn(global, 'setTimeout');
    jest.clearAllTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  test('should set timeout with provided callback and timeout', () => {
    doStuffByTimeout(callback, timeout);
    expect(mockedSetTimeout).toBeCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(callback, timeout);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  const callback = jest.fn();
  const interval = 10000;

  let mockedSetInterval: jest.SpyInstance;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    mockedSetInterval = jest.spyOn(global, 'setInterval');
    jest.clearAllTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  test('should set interval with provided callback and interval', () => {
    doStuffByInterval(callback, interval);
    expect(mockedSetInterval).toBeCalledWith(callback, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    doStuffByInterval(callback, interval);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalledTimes(2);

    jest.advanceTimersByTime(2 * interval);
    expect(callback).toHaveBeenCalledTimes(4);
  });
});

describe('readFileAsynchronously', () => {
  const pathToFile = '/path/to/file1.txt';
  const fileContents = 'This is file contents!';

  let spiedPathJoin: jest.SpyInstance;
  let spiedFsExistsSync: jest.SpyInstance;
  let spiedFsPromisesReadFile: jest.SpyInstance;

  beforeEach(() => {
    spiedPathJoin = jest.spyOn(path, 'join');
    spiedFsExistsSync = jest.spyOn(fs, 'existsSync');
    spiedFsExistsSync.mockReturnValue(true);
    spiedFsPromisesReadFile = jest.spyOn(fsPromises, 'readFile');
    spiedFsPromisesReadFile.mockReturnValue(
      new Promise((resolve, _) => resolve(fileContents)),
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should call join with pathToFile', async () => {
    readFileAsynchronously(pathToFile);
    expect(spiedPathJoin).toHaveBeenCalled();
    expect(spiedPathJoin.mock.lastCall).toContain(pathToFile);
  });

  test('should return null if file does not exist', async () => {
    spiedFsExistsSync.mockReturnValue(false);
    const result = readFileAsynchronously(pathToFile);
    return expect(result).resolves.toBeNull();
  });

  test('should return file content if file exists', async () => {
    const result = readFileAsynchronously(pathToFile);
    return expect(result).resolves.toBe(fileContents);
  });
});
