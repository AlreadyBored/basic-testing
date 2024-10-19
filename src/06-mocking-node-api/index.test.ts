import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { join } from 'path';

jest.mock('fs');
jest.mock('fs/promises');
jest.mock('path');

const TIME = 1000;

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const someFunction = jest.fn();
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(someFunction, TIME);

    expect(setTimeoutSpy).toHaveBeenCalledWith(someFunction, TIME);
  });

  test('should call callback only after timeout', () => {
    const someFunction = jest.fn();
    doStuffByTimeout(someFunction, TIME);
    expect(someFunction).not.toHaveBeenCalled();
    jest.advanceTimersByTime(TIME);
    expect(someFunction).toHaveBeenCalled();
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
    const someFunction = jest.fn();
    const setIntervalSpy = jest.spyOn(global, 'setInterval');
    doStuffByInterval(someFunction, TIME);

    expect(setIntervalSpy).toHaveBeenCalledWith(someFunction, TIME);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const someFunction = jest.fn();
    doStuffByInterval(someFunction, TIME);
    expect(someFunction).not.toHaveBeenCalled();

    jest.advanceTimersByTime(TIME);
    expect(someFunction).toHaveBeenCalled();

    jest.advanceTimersByTime(TIME);
    expect(someFunction).toHaveBeenCalledTimes(2);

    jest.advanceTimersByTime(TIME * 2);
    expect(someFunction).toHaveBeenCalledTimes(4);
  });
});

describe('readFileAsynchronously', () => {
  const PATH_TO_FILE = '../../some_path';

  test('should call join with pathToFile', async () => {
    await readFileAsynchronously(PATH_TO_FILE);
    expect(join).toHaveBeenCalledWith(__dirname, PATH_TO_FILE);
  });

  test('should return null if file does not exist', async () => {
    (existsSync as jest.Mock).mockReturnValue(false);

    const result = await readFileAsynchronously(PATH_TO_FILE);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const SOME_CONTENT = 'some content';
    (existsSync as jest.Mock).mockReturnValue(true);
    (readFile as jest.Mock).mockReturnValue(SOME_CONTENT);

    const result = await readFileAsynchronously(PATH_TO_FILE);
    expect(result).toBe(SOME_CONTENT);
  });
});
