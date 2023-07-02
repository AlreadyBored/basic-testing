import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

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

    doStuffByTimeout(callback, timeout);

    expect(callback).not.toHaveBeenCalled();

    jest.runAllTimers();

    expect(callback).toHaveBeenCalled();
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(callback, timeout);

    expect(callback).not.toHaveBeenCalled();

    jest.runAllTimers();

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

  test('should set interval with provided callback and interval', () => {
    const callback = jest.fn();
    const interval = 1000;
    jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, interval);

    expect(setInterval).toHaveBeenCalledWith(callback, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const interval = 1000;

    doStuffByInterval(callback, interval);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalledTimes(2);

    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathToFile = 'example.txt';
    const joinSpy = jest.spyOn(require('path'), 'join');

    await readFileAsynchronously(pathToFile);

    expect(joinSpy).toHaveBeenCalledWith(expect.any(String), pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = 'nonexistent.txt';
    const existsSyncMock = jest.spyOn(require('fs'), 'existsSync');
    existsSyncMock.mockReturnValue(false);

    const result = await readFileAsynchronously(pathToFile);

    expect(result).toBeNull();
    expect(existsSyncMock).toHaveBeenCalledWith(expect.any(String));
  });

  test('should return file content if file exists', async () => {
    const pathToFile = 'example.txt';
    const fileContent = 'This is an example file';

    const existsSyncMock = jest.spyOn(require('fs'), 'existsSync');
    const readFileMock = jest.spyOn(require('fs/promises'), 'readFile');

    existsSyncMock.mockReturnValue(true);
    readFileMock.mockResolvedValue(Buffer.from(fileContent));

    const result = await readFileAsynchronously(pathToFile);

    expect(result).toBe(fileContent);
    expect(existsSyncMock).toHaveBeenCalledWith(expect.any(String));
    expect(readFileMock).toHaveBeenCalledWith(expect.any(String));
  });
});
