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

    doStuffByTimeout(cb, 1000);
    expect(cb).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1000);
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
    const spyTimeout = jest.spyOn(global, 'setTimeout');
    const cb = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(cb, timeout);
    expect(spyTimeout).toHaveBeenCalledWith(cb, timeout);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const cb = jest.fn();

    doStuffByInterval(cb, 100);
    jest.advanceTimersByTime(300);
    expect(cb).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const joinSpy = jest.spyOn(path, 'join');
    const filePath = 'test';

    await readFileAsynchronously(filePath);
    expect(joinSpy).toHaveBeenCalledWith(__dirname, filePath);
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
    const fileContent = 'content';
    const fileBuffer = Buffer.from(fileContent);
    jest.spyOn(fsPromises, 'readFile').mockResolvedValue(fileBuffer);
    const result = await readFileAsynchronously(filePath);

    expect(result).toBe(fileContent);
  });
});
