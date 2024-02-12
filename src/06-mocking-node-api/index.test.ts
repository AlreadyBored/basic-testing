import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';
import fs from 'fs';
import path from 'path';

describe('doStuffByTimeout', () => {
  beforeEach(() => {
    jest.spyOn(global, 'setTimeout');
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const time = 1000;
    doStuffByTimeout(callback, time);
    expect(setTimeout).toHaveBeenCalledWith(callback, time);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(time);
    expect(callback).toHaveBeenCalled();
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const time = 3000;
    doStuffByTimeout(callback, time);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(time);
    expect(callback).toHaveBeenCalled();
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
    const spySetInterval = jest.spyOn(global, 'setInterval');
    const callback = jest.fn();
    const time = 1000;
    doStuffByInterval(callback, time);
    expect(setInterval).toHaveBeenCalledWith(callback, time);
    expect(spySetInterval).toHaveBeenCalled();
    jest.advanceTimersByTime(time);
    expect(callback).toHaveBeenCalled();
    spySetInterval.mockRestore();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const spySetInterval = jest.spyOn(global, 'setInterval');
    const callback = jest.fn();
    const time = 3000;
    doStuffByInterval(callback, time);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(time);
    expect(callback).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(time);
    expect(callback).toHaveBeenCalledTimes(2);
    jest.advanceTimersByTime(time);
    expect(callback).toHaveBeenCalledTimes(3);
    spySetInterval.mockRestore();
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    jest.spyOn(path, 'join');
    jest.spyOn(fs, 'existsSync').mockImplementation(() => false);
    await readFileAsynchronously('path');
    expect(path.join).toHaveBeenCalledWith(__dirname, 'path');
    jest.restoreAllMocks();
  });

  test('should return null if file does not exist', async () => {
    const spyExistsSync = jest
      .spyOn(fs, 'existsSync')
      .mockImplementation(() => false);
    const result = await readFileAsynchronously('path');
    expect(result).toBeNull();
    spyExistsSync.mockRestore();
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs, 'existsSync').mockImplementation(() => true);
    jest
      .spyOn(fs.promises, 'readFile')
      .mockImplementation(async () => Buffer.from('file content', 'utf-8'));
    const result = await readFileAsynchronously('path');
    expect(result).toEqual('file content');
    jest.restoreAllMocks();
  });
});