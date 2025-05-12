import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;

    jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, timeout);

    expect(setTimeout).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(callback, timeout);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(timeout);

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
    const callback = jest.fn();
    const timeout = 1000;

    jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, timeout);

    expect(setInterval).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const interval = 1000;

    jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, interval);

    expect(setInterval).toHaveBeenCalled();

    jest.advanceTimersByTime(interval);
    expect(setInterval).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(interval);
    expect(setInterval).toHaveBeenCalledTimes(2);

    // jest.advanceTimersByTime(interval);
    // expect(setInterval).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const mockJoin = jest.fn().mockReturnValue('/mocked/path');
    jest.mock('path', () => ({
      join: mockJoin,
    }));

    const pathToFile = 'some/path/to/file.txt';
    await readFileAsynchronously(pathToFile);

    expect(mockJoin).toHaveBeenCalledWith(pathToFile);
  });

  test('should return null if file does not exist', async () => {
    // Write your test here
  });

  test('should return file content if file exists', async () => {
    // Write your test here
  });
});
