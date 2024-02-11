import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

const timeout = 1500;

let spy: jest.SpyInstance;

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
    spy.mockRestore();
  });

  afterEach(() => {
    spy.mockReset();
  });

  test('should set timeout with provided callback and timeout', () => {
    spy = jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();
    doStuffByTimeout(callback, timeout);

    expect(spy).toHaveBeenLastCalledWith(callback, timeout);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    expect(callback).not.toHaveBeenCalled();

    doStuffByTimeout(callback, timeout);
    jest.runAllTimers();

    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(1);

    jest.clearAllTimers();
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
    spy = jest.spyOn(global, 'setInterval');
    const callback = jest.fn();
    doStuffByInterval(callback, timeout);

    expect(spy).toHaveBeenLastCalledWith(callback, timeout);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    expect(callback).not.toHaveBeenCalled();

    doStuffByInterval(callback, 10);
    jest.advanceTimersByTime(timeout);

    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(timeout / 10);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    spy = jest.spyOn(path, 'join');
    const pathToFile = 'index.ts';

    expect(spy).toHaveBeenCalledTimes(0);

    readFileAsynchronously(pathToFile);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = 'blah-blah.ts';

    expect(await readFileAsynchronously(pathToFile)).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const pathToFile = 'index.ts';
    const content = 'Hello, world!';

    const spyFs = jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    const spyFsPromises = jest
      .spyOn(fsPromises, 'readFile')
      .mockResolvedValue(content);

    const result = await readFileAsynchronously(pathToFile);

    expect(result).toBe(content);

    spyFs.mockRestore();
    spyFsPromises.mockRestore();
  });
});
