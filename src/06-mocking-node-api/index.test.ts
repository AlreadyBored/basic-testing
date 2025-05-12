// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { join } from 'path';

jest.mock('fs');
jest.mock('fs/promises');
jest.mock('path');

describe('doStuffByTimeout', () => {
  let timeoutSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.useFakeTimers({ legacyFakeTimers: true });
    timeoutSpy = jest.spyOn(global, 'setTimeout');
  });

  afterEach(() => {
    jest.useRealTimers();
    timeoutSpy.mockRestore();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);
    expect(timeoutSpy).toHaveBeenCalledWith(callback, 1000);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);

    jest.advanceTimersByTime(2000);

    expect(callback).toBeCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  let intervalSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.useFakeTimers({ legacyFakeTimers: true });
    intervalSpy = jest.spyOn(global, 'setInterval');
  });

  afterEach(() => {
    jest.useRealTimers();
    intervalSpy.mockRestore();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, 500);
    expect(intervalSpy).toHaveBeenCalledWith(callback, 500);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, 300);

    jest.advanceTimersByTime(900);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  const mockedExistsSync = existsSync as jest.Mock;
  const mockedReadFile = readFile as jest.Mock;
  const mockedJoin = join as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should call join with pathToFile', async () => {
    mockedJoin.mockReturnValue('/full/path/to/file');
    mockedExistsSync.mockReturnValue(false);

    await readFileAsynchronously('some-file.txt');

    expect(mockedJoin).toHaveBeenCalledWith(
      expect.any(String),
      'some-file.txt',
    );
  });

  test('should return null if file does not exist', async () => {
    mockedJoin.mockReturnValue('/full/path/to/file');
    mockedExistsSync.mockReturnValue(false);

    const result = await readFileAsynchronously('file.txt');

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    mockedJoin.mockReturnValue('/full/path/to/file');
    mockedExistsSync.mockReturnValue(true);
    mockedReadFile.mockResolvedValue(Buffer.from('mocked file content'));

    const result = await readFileAsynchronously('file.txt');

    expect(result).toBe('mocked file content');
    expect(mockedReadFile).toHaveBeenCalledWith('/full/path/to/file');
  });
});
