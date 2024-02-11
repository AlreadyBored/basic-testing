import fs from 'fs';
import fsPromises from 'fs/promises';
import path, { parse } from 'path';
import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';

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
    expect(setTimeout).toBeCalledWith(cb, timeout);
  });

  test('should call callback only after timeout', () => {
    const cb = jest.fn();
    const timeout = 1000;
    doStuffByTimeout(cb, timeout);
    expect(cb).toBeCalledTimes(0);
    jest.advanceTimersByTime(timeout);
    expect(cb).toBeCalledTimes(1);
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
    const timeout = 1000;
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(cb, timeout);
    expect(setInterval).toBeCalledWith(cb, timeout);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const cb = jest.fn();
    const timeout = 1000;
    doStuffByInterval(cb, timeout);
    let i = 0;
    while (i < 5) {
      expect(cb).toBeCalledTimes(i);
      jest.advanceTimersByTime(timeout);
      i++;
    }
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const fileName = 'some-path-to-file';
    const joinSpy = jest.spyOn(path, 'join');
    await readFileAsynchronously(fileName);
    expect(joinSpy).toBeCalledWith(__dirname, fileName);
  });

  test('should return null if file does not exist', async () => {
    const fileName = parse(__filename).base;
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    expect(await readFileAsynchronously(fileName)).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const fileName = parse(__filename).base;
    const content = 'Some content';
    jest
      .spyOn(fsPromises, 'readFile')
      .mockReturnValue(Promise.resolve(content));
    expect(await readFileAsynchronously(fileName)).toBe(content);
  });
});
