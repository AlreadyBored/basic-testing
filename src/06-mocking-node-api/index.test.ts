import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';
import path from 'path';
import fs from 'fs';
import fsp from 'fs/promises';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const shrek = jest.fn();
    const timeout = 3000;

    doStuffByTimeout(() => shrek, timeout);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), timeout);
  });

  test('should call callback only after timeout', () => {
    jest.spyOn(global, 'setTimeout');

    const shrek = jest.fn();
    const timeout = 3000;

    doStuffByTimeout(shrek, timeout);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), timeout);

    jest.advanceTimersByTime(timeout);

    expect(shrek).toHaveBeenCalled();
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
    const shrek = jest.fn();
    const interval = 3000;

    doStuffByInterval(shrek, interval);

    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(
      expect.any(Function),
      interval,
    );
  });

  test('should call callback multiple times after multiple intervals', () => {
    jest.spyOn(global, 'setInterval');
    const shrek = jest.fn();
    const interval = 3000;

    doStuffByInterval(shrek, interval);

    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(
      expect.any(Function),
      interval,
    );

    [1, 2, 3].forEach((item: number) => {
      jest.advanceTimersByTime(interval);

      expect(shrek).toHaveBeenCalledTimes(item);
    });
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);

    const spy = jest.spyOn(path, 'join');

    await readFileAsynchronously(String());

    expect(spy).toHaveBeenCalledWith(expect.any(String), expect.any(String));
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    expect(await readFileAsynchronously(String())).toBeNull();
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    const fileContent = 'Shrek is life. Shrek is love';
    jest.spyOn(fsp, 'readFile').mockResolvedValueOnce(fileContent);
    expect(await readFileAsynchronously(String())).toBe(fileContent);
  });
});
