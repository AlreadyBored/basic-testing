import {
  readFileAsynchronously,
  doStuffByTimeout,
  doStuffByInterval,
} from './index';
import fs from 'fs';
import path from 'path';
import fs_promise from 'fs/promises';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const timer = jest.spyOn(global, 'setTimeout');
    const call = jest.fn();

    doStuffByTimeout(call, 3000);
    expect(timer).toHaveBeenCalledTimes(1);
    expect(call).not.toHaveBeenCalled();
  });

  test('should call callback only after timeout', () => {
    const call = jest.fn();

    doStuffByTimeout(call, 3000);

    jest.runAllTimers();
    expect(call).toHaveBeenCalled();
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
    const interval = jest.spyOn(global, 'setInterval');
    const call = jest.fn();

    doStuffByInterval(call, 3000);

    expect(interval).toHaveBeenCalledTimes(1);
    expect(call).not.toHaveBeenCalled();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const call = jest.fn();

    doStuffByInterval(call, 3000);

    expect(call).not.toHaveBeenCalled();

    jest.advanceTimersByTime(6000);

    expect(call).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathJoin = jest.spyOn(path, 'join');
    await readFileAsynchronously('/f/f');
    expect(pathJoin).toHaveBeenCalled();
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockImplementationOnce(() => false);

    const data = await readFileAsynchronously('/f/f');

    expect(data).toBe(null);
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs, 'existsSync').mockImplementationOnce(() => true);
    jest
      .spyOn(fs_promise, 'readFile')
      .mockReturnValue(Promise.resolve('content'));

    const data = await readFileAsynchronously('/f/f');

    expect(data).toBe('content');
  });
});
