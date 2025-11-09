import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';

import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

jest.mock('fs');
jest.mock('fs/promises');
jest.mock('path');

const time = 1000;

beforeAll(() => {
  jest.useFakeTimers();
});

afterAll(() => {
  jest.useRealTimers();
});

describe('doStuffByTimeout', () => {
  test('should set timeout with provided callback and timeout', () => {
    const spy = jest.spyOn(globalThis, 'setTimeout');
    const cb = jest.fn();

    doStuffByTimeout(cb, time);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(cb, time);
    spy.mockRestore();
  });

  test('should call callback only after timeout', () => {
    const cb = jest.fn();

    doStuffByTimeout(cb, time);

    expect(cb).not.toHaveBeenCalled();
    jest.advanceTimersByTime(time);
    expect(cb).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  test('should set interval with provided callback and timeout', () => {
    const spy = jest.spyOn(globalThis, 'setInterval');
    const cb = jest.fn();

    doStuffByInterval(cb, time);

    expect(spy).toHaveBeenCalledWith(cb, time);
    spy.mockRestore();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const spy = jest.spyOn(globalThis, 'setInterval');
    const cb = jest.fn();

    doStuffByInterval(cb, time);

    expect(spy).toHaveBeenCalledWith(cb, time);
    spy.mockRestore();
    expect(cb).not.toHaveBeenCalled();

    jest.advanceTimersByTime(time);
    expect(cb).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(time);
    expect(cb).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  const fileName = 'file.txt';

  test('should call join with pathToFile', async () => {
    const spy = jest.spyOn(path, 'join');
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);

    await readFileAsynchronously(fileName);

    expect(spy).toHaveBeenCalledWith(__dirname, fileName);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);

    const result = await readFileAsynchronously('notfound.txt');

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const content = 'content';

    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fsPromises, 'readFile').mockResolvedValue(content);

    const result = await readFileAsynchronously(fileName);

    expect(result).toBe(content);
  });
});
