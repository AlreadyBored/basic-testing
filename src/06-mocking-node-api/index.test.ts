// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const spyTimeout = jest.spyOn(global, 'setTimeout');
    const cb = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(cb, timeout);
    expect(spyTimeout).toHaveBeenCalledWith(cb, timeout);
  });

  test('should call callback only after timeout', () => {
    const cb = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(cb, timeout);
    expect(cb).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timeout);
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
    const spyInterval = jest.spyOn(global, 'setInterval');
    const cb = jest.fn();
    const interval = 1000;

    doStuffByInterval(cb, interval);
    expect(spyInterval).toHaveBeenCalledWith(cb, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const cb = jest.fn();
    const interval = 1000;

    doStuffByInterval(cb, interval);
    expect(cb).not.toHaveBeenCalled();
    jest.advanceTimersByTime(interval * 3);
    expect(cb).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const spyJoin = jest.spyOn(path, 'join');
    const filePath = 'test';

    await readFileAsynchronously(filePath);
    expect(spyJoin).toHaveBeenCalledWith(__dirname, filePath);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const filePath = 'test';
    const result = await readFileAsynchronously(filePath);

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    const filePath = 'test';
    const content = 'test';
    const bufferContent = Buffer.from(content);

    jest.spyOn(fsPromises, 'readFile').mockResolvedValue(bufferContent);
    const result = await readFileAsynchronously(filePath);
    expect(result).toBe(content);
  });
});
