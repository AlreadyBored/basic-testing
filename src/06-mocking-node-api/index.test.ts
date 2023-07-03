import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';

const TIMEOUT = 1000;
const INTERVAL = 1000;
const callback = jest.fn();

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(globalThis, 'setTimeout');
    doStuffByTimeout(callback, TIMEOUT);

    expect(setTimeout).toHaveBeenCalledWith(callback, TIMEOUT);
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(callback, TIMEOUT);

    expect(callback).not.toHaveBeenCalled();
    jest.runAllTimers();
    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(globalThis, 'setInterval');
    doStuffByInterval(callback, INTERVAL);

    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenCalledWith(callback, INTERVAL);
  });

  test('should call callback multiple times after multiple intervals', () => {
    jest.spyOn(globalThis, 'setInterval');
    doStuffByInterval(callback, INTERVAL);

    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(INTERVAL);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathToFile = 'path/to/file';
    const joinSpy = jest.spyOn(path, 'join');
    await readFileAsynchronously(pathToFile);
    expect(joinSpy).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const mockExistsSync = jest.spyOn(fs, 'existsSync');
    mockExistsSync.mockReturnValue(false);

    const result = await readFileAsynchronously('fileDoesNotExist');

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const mockExistsSync = jest.spyOn(fs, 'existsSync');
    mockExistsSync.mockReturnValue(true);

    const mockReadFile = jest.spyOn(fsPromises, 'readFile');
    mockReadFile.mockResolvedValue('file content');

    const result = await readFileAsynchronously('fileasdasd');

    expect(result).toBe('file content');
  });
});
