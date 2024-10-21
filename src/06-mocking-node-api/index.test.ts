import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';
import fs from 'fs';
// import { readFile } from 'fs/promises';

const TIME = 1000;
const INTERVAL_COUNT = 3;
const PATH_TO_FILE = '/path/to/file.txt';
const CONTENT = 'Lorem Ipsum';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const spySetTimeout = jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, TIME);

    expect(spySetTimeout).toHaveBeenCalledWith(callback, TIME);
    expect(spySetTimeout).toHaveBeenCalledTimes(1);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();

    doStuffByTimeout(callback, TIME);

    expect(callback).not.toBeCalled();

    jest.runAllTimers();

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

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const spySetInterval = jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, TIME);

    expect(spySetInterval).toHaveBeenLastCalledWith(callback, TIME);
    expect(spySetInterval).toHaveBeenCalledTimes(1);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();

    doStuffByInterval(callback, TIME);

    expect(callback).not.toBeCalled();

    for (let i = 0; i < INTERVAL_COUNT; i++) {
      jest.runOnlyPendingTimers();
      expect(callback).toHaveBeenCalledTimes(i + 1);
    }
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    jest.spyOn(path, 'join');

    await readFileAsynchronously(PATH_TO_FILE);

    expect(path.join).toHaveBeenCalled();
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);

    const result = await readFileAsynchronously(PATH_TO_FILE);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs.promises, 'readFile').mockResolvedValue(CONTENT);
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);

    const result = await readFileAsynchronously(PATH_TO_FILE);
    expect(result).toBe(CONTENT);
  });
});
