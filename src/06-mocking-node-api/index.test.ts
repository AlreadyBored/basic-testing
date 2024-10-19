import { join } from 'path';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';

import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';

jest.mock('path', () => ({
  ...jest.requireActual<typeof import('path')>('path'),
  join: jest.fn(),
}));

jest.mock('fs', () => ({
  ...jest.requireActual<typeof import('fs')>('fs'),
  existsSync: jest.fn(),
}));

jest.mock('fs/promises', () => ({
  ...jest.requireActual<typeof import('fs/promises')>('fs/promises'),
  readFile: jest.fn(),
}));

const mockedPath = join as jest.Mock;
const mockedExistsSync = existsSync as jest.Mock;
const mockedReadFile = readFile as jest.Mock;

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const sto = jest.spyOn(global, 'setTimeout');
    const cb = jest.fn();

    doStuffByTimeout(cb, 100);
    expect(sto).toHaveBeenCalledWith(cb, 100);
  });

  test('should call callback only after timeout', () => {
    const cb = jest.fn();

    doStuffByTimeout(cb, 1000);
    expect(cb).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1000);
    expect(cb).toHaveBeenCalled();
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
    const sti = jest.spyOn(global, 'setInterval');
    const cb = jest.fn();

    doStuffByInterval(cb, 100);

    expect(sti).toHaveBeenCalledWith(cb, 100);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const cb = jest.fn();

    doStuffByInterval(cb, 10);
    expect(cb).not.toHaveBeenCalled();

    jest.advanceTimersByTime(100);

    expect(cb).toHaveBeenCalledTimes(10);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathToFile = './indexasd.ts';
    mockedExistsSync.mockReturnValueOnce(false);

    await readFileAsynchronously(pathToFile);
    expect(mockedPath).toHaveBeenCalledWith(expect.any(String), pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = './index.ts';
    mockedExistsSync.mockReturnValueOnce(false);

    const result = await readFileAsynchronously(pathToFile);

    expect(result).toEqual(null);
  });

  test('should return file content if file exists', async () => {
    const pathToFile = './indexasd.ts';
    const fileContent = 'test';

    mockedExistsSync.mockReturnValueOnce(true);
    mockedReadFile.mockReturnValueOnce(Promise.resolve(fileContent));

    const result = await readFileAsynchronously(pathToFile);

    expect(result).toEqual(fileContent);
  });
});
