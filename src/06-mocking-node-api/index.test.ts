import { join } from 'path';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';

import { readFileAsynchronously, doStuffByInterval, doStuffByTimeout } from '.';

describe('doStuffByTimeout', () => {
  let callback: () => void;
  const timeoutMs = 420;

  beforeEach(() => {
    callback = jest.fn();
    jest.spyOn(global, 'setTimeout');
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    doStuffByTimeout(callback, timeoutMs);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(callback, timeoutMs);
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(callback, timeoutMs);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(timeoutMs);

    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  let callback: () => void;
  const intervalMs = 420;

  beforeEach(() => {
    callback = jest.fn();
    jest.spyOn(global, 'setInterval');
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    doStuffByInterval(callback, intervalMs);

    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenCalledWith(callback, intervalMs);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const numberOfCalls = 10;

    doStuffByInterval(callback, intervalMs);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(intervalMs * numberOfCalls);

    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(numberOfCalls);
  });
});

jest.mock('fs', () => ({
  existsSync: jest.fn(),
}));

jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
}));

jest.mock('path', () => ({
  join: jest.fn(),
}));

describe('readFileAsynchronously', () => {
  const pathToFile = 'some/path';

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should call join with pathToFile', async () => {
    (existsSync as jest.Mock).mockReturnValue(false);

    await readFileAsynchronously(pathToFile);

    expect(join).toHaveBeenCalledWith(expect.any(String), pathToFile);
  });

  test('should return null if file does not exist', async () => {
    (existsSync as jest.Mock).mockReturnValue(false);

    const result = await readFileAsynchronously(pathToFile);

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const fileContents = 'all your base are belong to us';

    (existsSync as jest.Mock).mockReturnValue(true);
    (readFile as jest.Mock).mockResolvedValue(fileContents);

    const result = await readFileAsynchronously(pathToFile);

    expect(result).toBe(fileContents);
  });
});
