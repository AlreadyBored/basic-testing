import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import fs from 'fs';
import fspromises from 'fs/promises';
import { join } from 'path';

jest.mock('fs/promises');

describe('doStuffByTimeout', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const cb = jest.fn();
    const timeout = 1000;
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(cb, timeout);
    expect(cb).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timeout);
    expect(cb).toHaveBeenCalled();
  });

  test('should call callback only after timeout', () => {
    const cb = jest.fn();
    const timeout = 1000;
    doStuffByTimeout(cb, timeout);
    expect(cb).not.toHaveBeenCalled();
    jest.runAllTimers();
    expect(cb).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  test('should set interval with provided callback and interval', () => {
    const cb = jest.fn();
    const interval = 1000;
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(cb, interval);
    expect(cb).not.toHaveBeenCalled();
    jest.advanceTimersByTime(interval);
    expect(cb).toHaveBeenCalled();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const cb = jest.fn();
    const interval = 1000;
    doStuffByInterval(cb, interval);
    expect(cb).not.toHaveBeenCalled();
    jest.advanceTimersByTime(interval);
    expect(cb).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(interval);
    expect(cb).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathToFile = 'example.txt';
    const existsSyncMock = jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    await readFileAsynchronously(pathToFile);
    expect(existsSyncMock).toHaveBeenCalledWith(join(__dirname, pathToFile));
    existsSyncMock.mockRestore();
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = 'example.txt';
    const existsSyncMock = jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBeNull();
    existsSyncMock.mockRestore();
  });

  test('should return file content if file exists', async () => {
    const pathToFile = 'example.txt';
    const fileContent = 'File content';
    const existsSyncMock = jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    const readFileMock = jest
      .spyOn(fspromises, 'readFile')
      .mockResolvedValue(Buffer.from(fileContent));
    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBe(fileContent);
    existsSyncMock.mockRestore();
    readFileMock.mockRestore();
  });
});
