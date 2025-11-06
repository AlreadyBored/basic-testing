import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  () => {
    jest.useRealTimers();
  };

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1000);
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
    doStuffByInterval(callback, 1000);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalled();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, 1000);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalled();
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(2);
  });
});

jest.mock('fs');
jest.mock('path');
jest.mock('fs/promises');

describe('readFileAsynchronously', () => {
  beforeEach(() => {
    jest.spyOn(path, 'join').mockImplementation((...paths) => paths.join('/'));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should call join with pathToFile', async () => {
    const pathToFile = 'index.ts';
    const joinSpy = jest
      .spyOn(path, 'join')
      .mockReturnValue('mocked/path/index.ts'); //если вызываем метод join из path, то должен вызваться такой результат
    await readFileAsynchronously(pathToFile);
    expect(joinSpy).toHaveBeenCalledWith(__dirname, pathToFile);
    joinSpy.mockRestore();
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = 'index.ts';
    jest.spyOn(path, 'join').mockReturnValue(`mocked/path/${pathToFile}`);
    const existsSyncSpy = jest.spyOn(fs, 'existsSync').mockReturnValue(false);

    const result = await readFileAsynchronously(pathToFile);

    expect(result).toBeNull();
    expect(existsSyncSpy).toHaveBeenCalledWith(
      expect.stringContaining(pathToFile),
    );

    existsSyncSpy.mockRestore();
    (path.join as jest.Mock).mockRestore();
  });

  test('should return file content if file exists', async () => {
    const pathToFile = 'index.ts';
    const fileContent = 'test';
    const existsSyncSpy = jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    const readFileSpy = jest
      .spyOn(fsPromises, 'readFile')
      .mockResolvedValue(Buffer.from(fileContent));

    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBe(fileContent);
    expect(existsSyncSpy).toHaveBeenCalled();
    expect(readFileSpy).toHaveBeenCalled();

    existsSyncSpy.mockRestore();
    readFileSpy.mockRestore();
  });
});
