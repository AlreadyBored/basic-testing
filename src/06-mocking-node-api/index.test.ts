// Uncomment the code below and write your tests
import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';
import { join } from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';

jest.mock('path', () => {
  return {
    ...jest.requireActual('path'),
    join: jest.fn(),
  };
});

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    // Write your test here
    jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
  });

  test('should call callback only after timeout', () => {
    // Write your test here
    jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);
    expect(callback).not.toHaveBeenCalled();
    jest.runAllTimers();
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
    // Write your test here
    jest.spyOn(global, 'setInterval');
    const callback = jest.fn();
    doStuffByInterval(callback, 1000);
    expect(setInterval).toHaveBeenCalled();
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    // Write your test here
    jest.spyOn(global, 'setInterval');
    const callback = jest.fn();
    doStuffByInterval(callback, 100);
    jest.runOnlyPendingTimers();
    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(10);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    // Write your test here
    await readFileAsynchronously('123');
    expect(join).toHaveBeenCalledWith(__dirname, '123');
  });

  test('should return null if file does not exist', async () => {
    // Write your test here

    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const result = await readFileAsynchronously('123');
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    // Write your test here
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest
      .spyOn(fsPromises, 'readFile')
      .mockResolvedValue(Buffer.from('content'));
    const result = await readFileAsynchronously('index.ts');
    expect(result).toBe('content');
  });
});
