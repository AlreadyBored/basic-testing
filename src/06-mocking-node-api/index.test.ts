// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';
import fs from 'fs';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const cb = jest.fn();
    const timeout = 1000;
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(cb, timeout);
    expect(setTimeout).toHaveBeenCalledWith(cb, timeout);
  });

  test('should call callback only after timeout', () => {
    const cb = jest.fn();
    const timeout = 1000;
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(cb, timeout);
    expect(cb).not.toHaveBeenCalled();
    jest.runAllTimers();
    expect(cb).toHaveBeenCalled();
    expect(cb).toHaveBeenCalledTimes(1);
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
    const interval = 1000;
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(cb, interval);
    expect(setInterval).toHaveBeenCalledWith(cb, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const cb = jest.fn();
    const interval = 1000;
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(cb, interval);
    expect(cb).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1000);
    expect(cb).toHaveBeenCalled();
    expect(cb).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(2000);
    expect(cb).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const join = jest.spyOn(path, 'join');
    await readFileAsynchronously('../README.md');
    expect(join).toHaveBeenCalled();
  });

  test('should return null if file does not exist', async () => {
    fs.existsSync = jest.fn(() => false);
    await expect(readFileAsynchronously('')).resolves.toBeNull();
  });

  test('should return file content if file exists', async () => {
    const content = 'content';
    fs.existsSync = jest.fn(() => true);
    fs.promises.readFile = jest.fn().mockResolvedValue(content);
    await expect(readFileAsynchronously('')).resolves.toBe(content);
  });
});
