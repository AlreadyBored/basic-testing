// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import * as path from 'path';
import * as fs from 'fs';
import * as fsPromises from 'fs/promises';

jest.mock('path');
jest.mock('fs');
jest.mock('fs/promises');

describe('doStuffByTimeout', () => {
  const callBackSFn = jest.fn();
  const timer = 100;
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callBackSFn, timer);
    expect(global.setTimeout).toHaveBeenCalledWith(callBackSFn, timer);
  });

  test('should call callback only after timeout', () => {
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callBackSFn, timer);
    jest.advanceTimersByTime(timer);
    expect(global.setTimeout).toHaveBeenCalledTimes(1);
    expect(callBackSFn).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  const callBackSFn = jest.fn();
  const timer = 100;
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(callBackSFn, timer);
    expect(global.setInterval).toHaveBeenCalledWith(callBackSFn, timer);
  });

  test('should call callback multiple times after multiple intervals', () => {
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(callBackSFn, timer);
    jest.advanceTimersByTime(timer);
    expect(global.setInterval).toHaveBeenCalledTimes(1);
    expect(callBackSFn).toHaveBeenCalled();
  });
});

describe('readFileAsynchronously', () => {
  const pathToFile = 'file.txt';

  test('should call join with pathToFile', async () => {
    await readFileAsynchronously(pathToFile);
    expect(path.join).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const fileContent = 'file content';
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fsPromises, 'readFile').mockResolvedValue(fileContent);
    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBe(fileContent);
  });
});
