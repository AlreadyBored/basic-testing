// Uncomment the code below and write your tests
import path from 'node:path';
import fs from 'node:fs';
import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from './index';

jest.useFakeTimers();

describe('doStuffByTimeout', () => {
  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;
    
    doStuffByTimeout(callback, timeout);
    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(timeout);
    expect(callback).toBeCalled();
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(callback, timeout);
    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(timeout - 100);
    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(100);
    expect(callback).toBeCalled();
  });
});

describe('doStuffByInterval', () => {
  test('should set interval with provided callback and interval', () => {
    const callback = jest.fn();
    const interval = 500;

    doStuffByInterval(callback, interval);
    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(interval);
    expect(callback).toBeCalled();

    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalledTimes(2);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const interval = 500;
    const totalCalls = 5;

    doStuffByInterval(callback, interval);

    for (let i = 0; i < totalCalls; i++) {
      jest.advanceTimersByTime(interval);
    }

    expect(callback).toHaveBeenCalledTimes(totalCalls);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const joinSpy = jest.spyOn(path, 'join');
    await readFileAsynchronously('testfile.txt');

    expect(joinSpy).toHaveBeenCalledWith(__dirname, 'testfile.txt');
    joinSpy.mockRestore();
  });

  test('should return null if file does not exist', async () => {
    const result = await readFileAsynchronously('nonexistentfile.txt');
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs.promises, 'readFile').mockResolvedValue('fileContent');

    const result = await readFileAsynchronously('existingfile.txt');
    expect(result).toEqual('fileContent');
  });
});
