import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';
import path from 'path';
import fs from 'fs';
import fsAsync from 'fs/promises';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const timer = 1000;
    const spyTimeout = jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, timer);

    expect(spyTimeout).toHaveBeenCalledWith(callback, timer);

    spyTimeout.mockRestore();
  });

  test('should call callback only after timeout', () => {
    const callBack = jest.fn();
    doStuffByTimeout(callBack, 1000);

    // At this point in time, the callback should not have been called yet
    expect(callBack).not.toBeCalled();

    jest.runAllTimers();
    // Now our callback should have been called!
    expect(callBack).toBeCalled();
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
    const spyInterval = jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, interval);

    expect(spyInterval).toHaveBeenCalledWith(callback, interval);

    spyInterval.mockRestore();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const interval = 1000;

    doStuffByInterval(callback, interval);

    jest.advanceTimersByTime(3000);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathToFile = 'some/path.txt';

    const mockJoin = jest.spyOn(path, 'join');

    await readFileAsynchronously(pathToFile);
    expect(mockJoin).toBeCalledWith(__dirname, pathToFile);

    mockJoin.mockRestore();
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = 'some/path.txt';
    const mockExistsSync = jest.spyOn(fs, 'existsSync');

    mockExistsSync.mockReturnValue(false);

    await expect(readFileAsynchronously(pathToFile)).resolves.toBeNull();

    mockExistsSync.mockRestore();
  });

  test('should return file content if file exists', async () => {
    const pathToFile = 'some/path.txt';
    const fileContent = Buffer.from('string');
    const mockExistsSync = jest.spyOn(fs, 'existsSync');
    const mockReadFile = jest.spyOn(fsAsync, 'readFile');

    mockReadFile.mockResolvedValue(fileContent);
    mockExistsSync.mockReturnValue(true);

    await expect(readFileAsynchronously(pathToFile)).resolves.toEqual(
      expect.any(String),
    );

    mockExistsSync.mockRestore();
    mockReadFile.mockRestore();
  });
});
