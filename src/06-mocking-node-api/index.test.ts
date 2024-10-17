import path from 'path';
import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const timeout = 1000;
    const callback = jest.fn();
    jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, timeout);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    const timeout = 1000;
    const callback = jest.fn();
    jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, timeout);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(timeout);

    expect(callback).toHaveBeenCalled();
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
    const timeout = 1000;
    const callback = jest.fn();
    jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, timeout);

    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const timeout = 1000;
    const times = 5;
    const callback = jest.fn();
    jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, timeout);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(times * timeout);

    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(times);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const join = jest.spyOn(path, 'join');
    const existFile = './index.ts';
    await readFileAsynchronously(existFile);

    expect(join).toHaveBeenCalledWith(expect.any(String), existFile);
  });

  test('should return null if file does not exist', async () => {
    const absentFile = './index';
    expect(await readFileAsynchronously(absentFile)).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const existFile = './index.ts';
    const absentFile = './index';

    const existContent = await readFileAsynchronously(existFile);
    const nullContent = await readFileAsynchronously(absentFile);

    expect(
      typeof existContent === 'string' && nullContent === null,
    ).toBeTruthy();
  });
});
