import { doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const timeout = 1000;
    const callback = jest.fn();

    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, timeout);
    expect(setTimeoutSpy).toHaveBeenCalledWith(callback, timeout);

    setTimeoutSpy.mockRestore();
  });

  test('should call callback only after timeout', () => {
    const timeout = 1000;
    const callback = jest.fn();

    doStuffByTimeout(callback, timeout);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalled();

    jest.useRealTimers();
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
    const interval = 1000;
    const callback = jest.fn();

    const setIntervalSpy = jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, interval);
    expect(setIntervalSpy).toHaveBeenCalledWith(callback, interval);

    setIntervalSpy.mockRestore();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const interval = 1000;
    const callback = jest.fn();

    doStuffByInterval(callback, interval);

    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalledTimes(2);

    jest.useRealTimers();
  });
});

describe('readFileAsynchronously', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('should call join with pathToFile', async () => {
    const mockedJoin = jest.fn(() => '/system/dir/user');
    const file = 'file.txt';

    jest.doMock('path', () => ({
      ...jest.requireActual('path'),
      join: mockedJoin,
    }));

    jest.doMock('fs', () => ({
      ...jest.requireActual('fs'),
      existsSync: jest.fn(() => false),
    }));

    const { readFileAsynchronously } = require('.');

    await readFileAsynchronously(file);
    expect(mockedJoin).toHaveBeenCalledWith(__dirname, file);
  });

  test('should return null if file does not exist', async () => {
    const file = 'file.txt';

    jest.doMock('path', () => ({
      ...jest.requireActual('path'),
      join: jest.fn(() => '/system/dir/user'),
    }));

    jest.doMock('fs', () => ({
      ...jest.requireActual('fs'),
      existsSync: jest.fn(() => false),
    }));

    const { readFileAsynchronously } = require('.');

    const result = await readFileAsynchronously(file);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const file = 'file.txt';
    const fileReadResult = 'file contents';

    jest.doMock('path', () => ({
      ...jest.requireActual('path'),
      join: jest.fn(() => '/system/dir/user'),
    }));

    jest.doMock('fs', () => ({
      ...jest.requireActual('fs'),
      existsSync: jest.fn(() => true),
    }));

    jest.doMock('fs/promises', () => ({
      ...jest.requireActual('fs/promises'),
      readFile: jest.fn(() => Promise.resolve(fileReadResult)),
    }));

    const { readFileAsynchronously } = require('.');

    const result = await readFileAsynchronously(file);
    expect(result).toBe(fileReadResult);
  });
});
