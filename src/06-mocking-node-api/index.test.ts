import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

jest.mock('fs');
jest.mock('fs/promises');
jest.mock('path', () => ({
  join: jest.fn((...args) => args.join('/')),
}));

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');
    const callback = () => {};
    doStuffByTimeout(callback, 1000);
    expect(setTimeoutSpy).toHaveBeenCalledWith(callback, 1000);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);
    jest.advanceTimersByTime(1000);
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
    const setIntervalSpy = jest.spyOn(global, 'setInterval');
    const callback = () => {};
    doStuffByInterval(callback, 1000);
    expect(setIntervalSpy).toHaveBeenCalledWith(callback, 1000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, 1000);
    jest.advanceTimersByTime(3000);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  const mockedExistsSync = existsSync as jest.MockedFunction<typeof existsSync>;
  const mockedReadFile = readFile as jest.MockedFunction<typeof readFile>;
  const mockedJoin = join as jest.MockedFunction<typeof join>;

  beforeEach(() => {
    mockedJoin.mockClear();
    mockedExistsSync.mockClear();
    mockedReadFile.mockClear();
  });

  test('should call join with pathToFile', async () => {
    const pathToFile = 'test.txt';
    mockedExistsSync.mockReturnValue(false);
    await readFileAsynchronously(pathToFile);
    expect(mockedJoin).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    mockedExistsSync.mockReturnValue(false);
    const result = await readFileAsynchronously('test.txt');
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    mockedExistsSync.mockReturnValue(true);
    mockedReadFile.mockResolvedValue(Buffer.from('test'));
    const result = await readFileAsynchronously('test.txt');
    expect(result).toBe('test');
  });
});
