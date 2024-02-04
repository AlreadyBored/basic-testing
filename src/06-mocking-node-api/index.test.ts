// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';

describe('doStuffByTimeout', () => {
  let mockCallback: jest.Mock;
  let mockTimeout: number;

  beforeAll(() => {
    jest.useFakeTimers();
    mockCallback = jest.fn();
    mockTimeout = 5;
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(mockCallback, mockTimeout);

    jest.advanceTimersByTime(mockTimeout);
    expect(setTimeoutSpy).toHaveBeenCalledWith(mockCallback, mockTimeout);

    setTimeoutSpy.mockRestore();
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(mockCallback, mockTimeout);

    expect(mockCallback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(mockTimeout);
    expect(mockCallback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  let mockCallback: jest.Mock;
  let mockInterval: number;

  beforeAll(() => {
    jest.useFakeTimers();
    mockCallback = jest.fn();
    mockInterval = 1000;
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const setIntervalSpy = jest.spyOn(global, 'setInterval');
    doStuffByInterval(mockCallback, mockInterval);

    jest.advanceTimersByTime(mockInterval);
    expect(setIntervalSpy).toHaveBeenCalledWith(mockCallback, mockInterval);

    setIntervalSpy.mockRestore();
  });

  test('should call callback multiple times after multiple intervals', () => {
    doStuffByInterval(mockCallback, mockInterval);
    jest.advanceTimersByTime(mockInterval);

    expect(mockCallback.mock.calls.length).toBeGreaterThan(1);
  });
});

describe('readFileAsynchronously', () => {
  let pathToFile: string;

  beforeAll(() => {
    pathToFile = 'index.ts';
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should call join with pathToFile', async () => {
    const joinSpyOn = jest.spyOn(path, 'join');

    jest.spyOn(fs, 'existsSync').mockImplementation(jest.fn());
    jest.spyOn(fsPromises, 'readFile').mockImplementation(jest.fn());

    await readFileAsynchronously(pathToFile);

    expect(joinSpyOn).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    jest.spyOn(fsPromises, 'readFile').mockImplementation(jest.fn());

    const result = readFileAsynchronously(pathToFile);

    expect(result).resolves.toBeNull();
  });

  test('should return file content if file exists', async () => {
    const content = 'Hello Jest';
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fsPromises, 'readFile').mockResolvedValue(content);

    const result = readFileAsynchronously(pathToFile);

    expect(result).resolves.toBe(content);
  });
});
