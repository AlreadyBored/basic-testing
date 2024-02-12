// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'node:path';
import fs from 'node:fs';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const spyOnTimeout = jest.spyOn(global, 'setTimeout');

    const callback = jest.fn();
    const timerDelay = 1000;

    doStuffByTimeout(callback, timerDelay);

    expect(spyOnTimeout).toHaveBeenCalledWith(callback, timerDelay);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timerDelay = 1000;

    doStuffByTimeout(callback, timerDelay);

    expect(callback).not.toHaveBeenCalled();

    jest.runOnlyPendingTimers();

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
    const spyOnInterval = jest.spyOn(global, 'setInterval');
    const callback = jest.fn();
    const timerInterval = 1000;

    doStuffByInterval(callback, timerInterval);

    expect(spyOnInterval).toHaveBeenCalledTimes(1);
    expect(spyOnInterval).toHaveBeenCalledWith(callback, timerInterval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const timerInterval = 1000;

    doStuffByInterval(callback, timerInterval);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(timerInterval);
    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(timerInterval);
    expect(callback).toHaveBeenCalledTimes(2);

    jest.advanceTimersByTime(timerInterval);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathToFile = './index.ts';
    const spyOnJoin = jest.spyOn(path, 'join').mockReturnValue(pathToFile);

    await readFileAsynchronously(pathToFile);
    expect(spyOnJoin).toHaveBeenCalledWith(expect.anything(), pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = 'test';
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);

    const result = await readFileAsynchronously(pathToFile);

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const pathToFile = './test.txt';
    const fileContent = 'Test';

    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs.promises, 'readFile').mockResolvedValue(fileContent);

    const result = await readFileAsynchronously(pathToFile);

    expect(result).toBe(fileContent);
  });
});
