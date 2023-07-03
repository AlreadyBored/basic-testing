// Uncomment the code below and write your tests
import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';
import path from 'path';
//import fs from 'fs';
//import fsp from 'fs/promises';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const timer = jest.spyOn(global, 'setTimeout');

    const callback = jest.fn();
    const period = 1000;
    doStuffByTimeout(callback, period);
    expect(timer).toHaveBeenLastCalledWith(callback, period);
  });

  test('should call callback only after timeout', () => {
    const timer = jest.spyOn(global, 'setTimeout');

    const callback = jest.fn();
    const period = 1000;

    doStuffByTimeout(callback, period);
    expect(callback).not.toHaveBeenCalled();
    jest.runAllTimers();

    expect(timer).toHaveBeenCalled();
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
    const callback = jest.fn();
    const period = 1000;

    doStuffByInterval(callback, period);
    expect(setInterval).toHaveBeenCalledWith(callback, period);
  });

  test('should call callback multiple times after multiple intervals', () => {
    jest.spyOn(global, 'setInterval');
    const callback = jest.fn();
    const period = 1000;

    expect(callback).not.toHaveBeenCalled();
    doStuffByInterval(callback, period);
    expect(setInterval).toHaveBeenCalledWith(callback, period);
    doStuffByInterval(callback, period);
    expect(setInterval).toHaveBeenCalledWith(callback, period);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const spy = jest.spyOn(path, 'join');
    await readFileAsynchronously('1.txt');
    expect(spy).toHaveBeenCalled();
  });

  test('should return null if file does not exist', async () => {
    const r = await readFileAsynchronously('not-exist.txt');
    expect(r).toBeNull();
  });

  test('should return file content if file exists', async () => {
    //
  });
});
