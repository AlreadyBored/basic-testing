import path from 'path';
import fsPromisified from 'fs/promises';
import fs from 'fs';

import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const cb = jest.fn();

    expect(jest.getTimerCount()).toBe(0);
    doStuffByTimeout(cb, 1000);
    expect(jest.getTimerCount()).toBe(1);
  });

  test('should call callback only after timeout', () => {
    const cb = jest.fn();
    doStuffByTimeout(cb, 1000);

    expect(cb).not.toHaveBeenCalled();
    jest.runAllTimers();
    expect(cb).toHaveBeenCalled();
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
    const cb = jest.fn();
    const intervalSpy = jest.spyOn(global, 'setInterval');
    const interval = 1000;

    expect(intervalSpy).not.toHaveBeenCalled();
    doStuffByInterval(cb, interval);
    expect(intervalSpy).toHaveBeenCalledTimes(1);
    expect(intervalSpy).toHaveBeenCalledWith(cb, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const cb = jest.fn();
    const interval = 1000;

    doStuffByInterval(cb, interval);

    jest.advanceTimersByTime(interval);
    expect(cb).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(interval / 2);
    expect(cb).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(interval / 2);
    expect(cb).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const joinSpy = jest.spyOn(path, 'join');
    const pathToFile = 'mocked/path';

    await readFileAsynchronously(pathToFile);
    expect(joinSpy).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const existsSyncSpy = jest.spyOn(fs, 'existsSync');
    const pathToFile = 'mocked/path';

    existsSyncSpy.mockImplementationOnce(() => false);
    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    // mock readFile
    const fileContent = 'some file contend';
    const readFileSpy = jest.spyOn(fsPromisified, 'readFile');
    readFileSpy.mockImplementation(() => Promise.resolve(fileContent));

    // make sure that the file exists
    const existsSyncSpy = jest.spyOn(fs, 'existsSync');
    existsSyncSpy.mockImplementationOnce(() => true);

    const result = await readFileAsynchronously('mocked/path');
    expect(result).toBe(fileContent);
  });
});
