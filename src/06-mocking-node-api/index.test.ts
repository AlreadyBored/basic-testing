// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import { promises as fsPromises } from 'fs';
import path from 'path';

describe('doStuffByTimeout', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    // Write your test here
    // arrange
    const callback = jest.fn();
    const timeout = 1500;
    // act
    doStuffByTimeout(callback, timeout);
    //assert
    expect(setTimeout).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    // Write your test here
    // arrange
    const callback = jest.fn();
    const timeout = 1000;
    // act
    doStuffByTimeout(callback, timeout);

    //assert
    expect(callback).not.toHaveBeenCalled();
    jest.runAllTimers();
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
    // Write your test here
    // arrange
    const callback = jest.fn();
    const interval = 1500;
    // act
    doStuffByInterval(callback, interval);
    //assert
    expect(setInterval).toHaveBeenCalledWith(callback, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    // Write your test here
    // arrange
    const callback = jest.fn();
    const interval = 1000;
    // act
    doStuffByInterval(callback, interval);

    //assert
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
  const fileName = 'test.txt';
  const dir = '/some/dir';
  const filePath = '/some/dir/test.txt';

  test('should call join with pathToFile', async () => {
    // Write your test here
    // arrange
    (path.join as jest.Mock).mockReturnValue(filePath);
    // act
    await readFileAsynchronously(filePath);
    // assert
    expect(path.join).toHaveBeenCalledWith(dir, fileName);
  });

  test('should return null if file does not exist', async () => {
    // Write your test here
    // arrange
    (fsPromises.readFile as jest.Mock).mockRejectedValue({ code: 'ENOENT' });
    // act
    const result = await readFileAsynchronously(filePath);
    // assert
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    // Write your test here
    // arrange
    const fileContent = 'This is a test file';
    (fsPromises.readFile as jest.Mock).mockResolvedValue(fileContent);

    // act
    const result = await readFileAsynchronously(filePath);

    // assert
    expect(result).toBe(fileContent);
  });
});
