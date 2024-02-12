// Uncomment the code below and write your tests
// import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

import {
  doStuffByInterval,
  doStuffByTimeout,
  readFileAsynchronously,
} from './index';
import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';

const timer = 4000;
const interval = 1000;

const callback = jest.fn();

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    jest.clearAllTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const setTimeOut = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, timer);

    expect(setTimeOut).toBeCalled();
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(callback, timer);

    jest.advanceTimersByTime(timer);

    expect(callback).toBeCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    jest.clearAllTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const setInterval = jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, interval);

    expect(setInterval).toBeCalled();
  });

  test('should call callback multiple times after multiple intervals', () => {
    doStuffByInterval(callback, interval);

    jest.advanceTimersByTime(timer);
    expect(callback).toBeCalledTimes(timer / interval);
  });
});

const pathToFile = 'fakePathFile';
const readFileContent = 'Read File Content';

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathToFile = 'pathToFile';
    const joinSpy = jest.spyOn(path, 'join');

    await readFileAsynchronously(pathToFile);
    expect(joinSpy).toBeCalledWith();
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockImplementationOnce(() => false);

    await expect(readFileAsynchronously(pathToFile)).resolves.toBeNull();
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs, 'existsSync').mockImplementationOnce(() => true);
    jest
      .spyOn(fsPromises, 'readFile')
      .mockImplementationOnce(async () => readFileContent);

    await expect(readFileAsynchronously(pathToFile)).resolves.toEqual(
      readFileContent,
    );
  });
});
