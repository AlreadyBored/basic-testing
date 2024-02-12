import path from 'node:path';

import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  const mockFunc = jest.fn();

  beforeAll(() => {
    jest.useFakeTimers({
      legacyFakeTimers: true,
    });
    jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(mockFunc, 1000);
  });

  afterAll(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  test('should set timeout with provided callback and timeout', () => {
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(mockFunc, 1000);
  });

  test('should call callback only after timeout', () => {
    expect(mockFunc).not.toHaveBeenCalled();

    jest.advanceTimersByTime(2000);

    expect(mockFunc).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  const mockFunc = jest.fn();

  beforeAll(() => {
    jest.useFakeTimers({
      legacyFakeTimers: true,
    });
    jest.spyOn(global, 'setInterval');

    doStuffByInterval(mockFunc, 1000);
  });

  afterAll(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  test('should set interval with provided callback and timeout', () => {
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(mockFunc, 1000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    expect(mockFunc).not.toHaveBeenCalled();

    jest.advanceTimersToNextTimer();

    expect(mockFunc).toHaveBeenCalledTimes(1);

    jest.advanceTimersToNextTimer();

    expect(mockFunc).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  beforeAll(() => {
    jest.spyOn(path, 'join');
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('should call join with pathToFile', async () => {
    const pathToFile = '/absolute/path/to/test/file.txt';

    await readFileAsynchronously(pathToFile);

    expect(path.join).toHaveBeenCalledTimes(1);
    expect(path.join).toHaveBeenLastCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = '/absolute/path/to/test/file.txt';

    const fileContents = await readFileAsynchronously(pathToFile);

    expect(fileContents).toEqual(null);
  });

  test('should return file content if file exists', async () => {
    const validPathToFile = './file.txt';

    const fileContents = await readFileAsynchronously(validPathToFile);

    expect(fileContents).toEqual('Some\nTest\nContent\n');
  });
});
