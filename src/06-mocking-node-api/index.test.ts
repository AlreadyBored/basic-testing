import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import * as path from 'path';
import * as fs from 'fs';
import * as fsPromises from 'fs/promises';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);
    expect(setTimeout).toHaveBeenLastCalledWith(callback, 1000);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 2000);
    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(2000);
    expect(callback).toBeCalledTimes(1);
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
    doStuffByInterval(callback, 500);
    expect(setInterval).toHaveBeenLastCalledWith(callback, 500);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, 300);
    jest.advanceTimersByTime(900);
    expect(callback).toBeCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  let mockJoin: jest.SpyInstance;
  let mockExistsSync: jest.SpyInstance;
  let mockReadFile: jest.SpyInstance;

  beforeEach(() => {
    mockJoin = jest.spyOn(path, 'join');
    mockExistsSync = jest.spyOn(fs, 'existsSync');
    mockReadFile = jest.spyOn(fsPromises, 'readFile');
  });

  afterEach(() => {
    jest.clearAllMocks();
    mockJoin.mockRestore();
    mockExistsSync.mockRestore();
    mockReadFile.mockRestore();
  });

  test('should call join with pathToFile', async () => {
    mockJoin.mockReturnValue('/mock/path/file.txt');
    mockExistsSync.mockReturnValue(false);
    await readFileAsynchronously('file.txt');
    expect(mockJoin).toHaveBeenCalledWith(__dirname, 'file.txt');
  });

  test('should return null if file does not exist', async () => {
    mockJoin.mockReturnValue('/mock/path/file.txt');
    mockExistsSync.mockReturnValue(false);
    const result = await readFileAsynchronously('file.txt');
    expect(result).toBeNull();
    expect(mockReadFile).toHaveBeenCalledWith('/mock/path/file.txt');
  });
});
