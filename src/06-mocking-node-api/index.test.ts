import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import fsSync from 'fs/promises';
import fs from 'fs';
import path from 'path';


const callback = jest.fn();
const time = 1000;
describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, time);
    jest.advanceTimersByTime(time);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), time);
  });

  test('should call callback only after timeout', () => {
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(time)
    expect(callback).toHaveBeenCalledTimes(0);
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
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, time);
    jest.advanceTimersByTime(time);
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenCalledWith(expect.any(Function), time);
  });

  test('should call callback multiple times after multiple intervals', () => {
    doStuffByInterval(callback, time);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(time);
    expect(callback).toHaveBeenCalledTimes(2);
    jest.advanceTimersByTime(time);
    expect(callback).toHaveBeenCalledTimes(4);


  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const createPath = jest.spyOn(path, 'join');
    const pathToFile = 'fileForThisTest.txt';
    await readFileAsynchronously(pathToFile);
    expect(createPath).toHaveBeenCalledTimes(1);
    expect(createPath).toHaveBeenCalledWith(__dirname, pathToFile);
    createPath.mockRestore();
  });

  test('should return null if file does not exist', async () => {

    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    expect(await readFileAsynchronously('fileForThisTest.txt')).toBe(null);
  });

  test(
    'should return file content if file exists',
    async () => {
      const filename = 'fileForThisTest.txt';
      const text = 'im tired';
      jest.spyOn(fs, 'existsSync').mockReturnValue(true);
      jest.spyOn(fsSync, 'readFile').mockResolvedValue(text);
      const result = await readFileAsynchronously(filename);
      expect(result).toBe(text);
    });
});

