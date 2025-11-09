import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();

    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, 1000);

    expect(setTimeoutSpy).toHaveBeenCalledWith(callback, 1000);

    setTimeoutSpy.mockRestore();
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);

    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(999);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1);
    expect(callback).toHaveBeenCalledTimes(1);
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

    const setIntervalSpy = jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, 500);

    expect(setIntervalSpy).toHaveBeenCalledWith(callback, 500);

    setIntervalSpy.mockRestore();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, 500);

    jest.advanceTimersByTime(499);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);
    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should call join with pathToFile', async () => {
    const joinSpy = jest.spyOn(path, 'join');
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);

    await readFileAsynchronously('file.txt');

    expect(joinSpy).toHaveBeenCalledWith(expect.any(String), 'file.txt');

    joinSpy.mockRestore();
  });

  test('should return null if file does not exist', async () => {
    const existsSpy = jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const joinSpy = jest
      .spyOn(path, 'join')
      .mockReturnValue('/fake/path/file.txt');

    const result = await readFileAsynchronously('file.txt');

    expect(result).toBeNull();
    expect(joinSpy).toHaveBeenCalledWith(expect.any(String), 'file.txt');
    expect(existsSpy).toHaveBeenCalled();

    existsSpy.mockRestore();
    joinSpy.mockRestore();
  });

  test('should return file content if file exists', async () => {
    const existsSpy = jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    const readFileSpy = jest
      .spyOn(fsPromises, 'readFile')
      .mockResolvedValue(Buffer.from('hello'));
    const joinSpy = jest
      .spyOn(path, 'join')
      .mockReturnValue('/fake/path/file.txt');

    const result = await readFileAsynchronously('file.txt');

    expect(result).toBe('hello');
    expect(readFileSpy).toHaveBeenCalledWith('/fake/path/file.txt');

    existsSpy.mockRestore();
    readFileSpy.mockRestore();
    joinSpy.mockRestore();
  });
});
