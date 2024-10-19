// Uncomment the code below and write your tests
import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';
import path from 'path';
import fs from 'fs';

let callback: jest.Func;
let timeout: number;

describe('doStuffByTimeout', () => {
  beforeEach(() => {
    callback = jest.fn();
    timeout = 10000;
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    doStuffByTimeout(callback, timeout);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(callback, timeout);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timeout / 2);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timeout / 2);
    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeEach(() => {
    callback = jest.fn();
    timeout = 10000;
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    doStuffByInterval(callback, timeout);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(2);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const timesToTrigger = 5;
    doStuffByInterval(callback, timeout);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timeout * timesToTrigger);
    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(timesToTrigger);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathToFile = 'index.ts';
    const joinSpy = jest.spyOn(path, 'join');
    await readFileAsynchronously(pathToFile);
    expect(joinSpy).toHaveBeenCalledWith(__dirname, pathToFile);
    joinSpy.mockRestore();
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = 'something.not.exist';
    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(false);
    const functionResult = await readFileAsynchronously(pathToFile);
    expect(functionResult).toBeNull();
    jest.spyOn(fs, 'existsSync').mockRestore();
  });

  test('should return file content if file exists', async () => {
    const pathToFile = 'index.test.ts';
    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(true);
    jest
      .spyOn(fs.promises, 'readFile')
      .mockResolvedValueOnce(Buffer.from('Mock file content'));
    const functionResult = await readFileAsynchronously(pathToFile);
    expect(functionResult).toBe('Mock file content');
    jest.restoreAllMocks();
  });
});
