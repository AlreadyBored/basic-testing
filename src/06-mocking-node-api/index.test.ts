import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';

describe('doStuffByTimeout', () => {
  const callback = jest.fn();
  const timeout = 100;

  beforeEach(() => {
    jest.spyOn(global, 'setTimeout');
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    doStuffByTimeout(callback, timeout);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(callback, timeout);
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
  const timeout = 100;

  beforeEach(() => {
    jest.spyOn(global, 'setInterval');
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    doStuffByInterval(callback, timeout);
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const times = Math.floor(Math.random() * 9) + 2; // rand from 2 to 10

    doStuffByInterval(callback, timeout);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timeout * times);
    expect(callback).toHaveBeenCalledTimes(times);
  });
});

describe('readFileAsynchronously', () => {
  const mockExistSync = (res = false) =>
    jest.spyOn(fs, 'existsSync').mockReturnValue(res);

  test('should call join with pathToFile', async () => {
    mockExistSync();
    const spyJoin = jest.spyOn(path, 'join');
    readFileAsynchronously(String());
    expect(spyJoin).toHaveBeenCalledWith(expect.any(String), String());
  });

  test('should return null if file does not exist', async () => {
    mockExistSync(false);
    expect(await readFileAsynchronously(String())).toBeNull();
  });

  test('should return file content if file exists', async () => {
    mockExistSync(true);
    const content = 'file-content';
    jest.spyOn(fsPromises, 'readFile').mockResolvedValueOnce(content);
    expect(await readFileAsynchronously(String())).toBe(content);
  });
});
