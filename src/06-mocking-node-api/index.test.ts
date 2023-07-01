// Uncomment the code below and write your tests
import fsPromises from 'fs/promises';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';

const time = 1000;
const pathToFile = './index.ts';
const nonExistingFilePath = 'nonExistingPath';
const func = async () => await readFileAsynchronously(pathToFile);

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(func, time);
    expect(setTimeout).toHaveBeenCalledWith(func, 1000);
  });

  test('should call callback only after timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const callBack = jest.fn();
    doStuffByTimeout(callBack, time);
    jest.advanceTimersByTime(time);
    expect(setTimeout).toHaveBeenCalledTimes(1);
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
    doStuffByInterval(func, time);
    expect(setInterval).toHaveBeenCalledWith(func, 1000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, time);
    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(time * 3);
    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const spyJoin = jest.spyOn(path, 'join');
    await readFileAsynchronously(pathToFile);
    expect(spyJoin).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const result = await readFileAsynchronously(nonExistingFilePath);
    expect(result).toBe(null);
  });

  test('should return file content if file exists', async () => {
    const data = 'some test data';
    const promise: Promise<string | Buffer> = new Promise((resolve) =>
      resolve(Buffer.from(data, 'utf-8')),
    );
    jest.spyOn(fsPromises, 'readFile').mockReturnValue(promise);
    const result = await readFileAsynchronously(pathToFile);
    expect(result).toEqual(data);
  });
});