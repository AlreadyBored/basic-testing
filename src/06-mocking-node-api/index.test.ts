// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';

const timeout = 1000;

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const setTimeout = jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, timeout);
    expect(setTimeout).toHaveBeenCalledWith(callback, timeout);
    setTimeout.mockRestore();
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, timeout);
    expect(callback).not.toHaveBeenCalled();
    jest.runOnlyPendingTimers();
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
    const setInterval = jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, timeout);
    expect(setInterval).toHaveBeenCalledWith(callback, timeout);
    setInterval.mockRestore();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const times = 5;

    doStuffByInterval(callback, timeout);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(times * timeout);
    expect(callback).toHaveBeenCalledTimes(times);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const path_to_file = 'test/path';
    const mockPathJoin = jest.spyOn(path, 'join');

    readFileAsynchronously(path_to_file).then(() => {
      expect(mockPathJoin).toHaveBeenCalledWith(
        expect.anything(),
        path_to_file,
      );
      mockPathJoin.mockRestore();
    });
  });

  test('should return null if file does not exist', async () => {
    const path_to_file = 'test/path';
    const mockExistsSync = jest.spyOn(fs, 'existsSync');

    mockExistsSync.mockReturnValueOnce(false);
    expect(readFileAsynchronously(path_to_file)).resolves.toBeNull();
    mockExistsSync.mockRestore();
  });

  test('should return file content if file exists', async () => {
    const path_to_file = 'test/path';
    const mockExistsSync = jest.spyOn(fs, 'existsSync');
    const mockReadFile = jest.spyOn(fsPromises, 'readFile');
    const readResult = Buffer.from('result');

    mockExistsSync.mockReturnValueOnce(true);
    mockReadFile.mockReturnValueOnce(
      new Promise((_) => {
        _(readResult);
      }),
    );

    expect(readFileAsynchronously(path_to_file)).resolves.toEqual(
      readResult.toString(),
    );

    mockExistsSync.mockRestore();
    mockReadFile.mockRestore();
  });
});
