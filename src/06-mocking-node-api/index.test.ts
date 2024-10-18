// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'node:path';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();

    doStuffByTimeout(callback, 100);

    jest.advanceTimersByTime(100);

    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();

    doStuffByTimeout(callback, 100);

    expect(callback).toHaveBeenCalledTimes(0);

    jest.advanceTimersByTime(100);

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
    const callback = jest.fn();

    doStuffByInterval(callback, 100);

    jest.advanceTimersToNextTimer(1);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();

    doStuffByInterval(callback, 100);

    jest.advanceTimersToNextTimer(3);

    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const spyOnJoin = jest.spyOn(path, 'join');
    const pathToFile = '/test.txt';

    await readFileAsynchronously(pathToFile);

    expect(spyOnJoin).toBeCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const wrongFilePath = '/test1.txt';

    const result = await readFileAsynchronously(wrongFilePath);

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const filePath = '/test.txt';

    const result = await readFileAsynchronously(filePath);

    expect(result).not.toBeNull();
  });
});
