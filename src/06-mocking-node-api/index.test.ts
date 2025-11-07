// Uncomment the code below and write your tests
jest.mock('fs', () => ({
  existsSync: jest.fn(),
}));

jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
}));

jest.mock('path', () => ({
  join: jest.fn(),
}));

import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  test('should set timeout with provided callback and timeout', () => {
    const cb = jest.fn();
    const timeout = 250;

    const timeoutSpy = jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(cb, timeout);

    expect(timeoutSpy).toHaveBeenCalledTimes(1);
    expect(timeoutSpy).toHaveBeenCalledWith(cb, timeout);
  });

  test('should call callback only after timeout', () => {
    const cb = jest.fn();
    const timeout = 300;

    doStuffByTimeout(cb, timeout);

    expect(cb).not.toHaveBeenCalled();

    jest.advanceTimersByTime(299);
    expect(cb).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);
    expect(cb).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });
  afterAll(() => {
    jest.useRealTimers();
  });
  afterEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  test('should set interval with provided callback and timeout', () => {
    const cb = jest.fn();
    const every = 500;

    const intervalSpy = jest.spyOn(global, 'setInterval');

    doStuffByInterval(cb, every);

    expect(intervalSpy).toHaveBeenCalledTimes(1);
    expect(intervalSpy).toHaveBeenCalledWith(cb, every);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const cb = jest.fn();
    const every = 200;

    doStuffByInterval(cb, every);

    expect(cb).not.toHaveBeenCalled();

    jest.advanceTimersByTime(200);
    expect(cb).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(200);
    expect(cb).toHaveBeenCalledTimes(2);

    jest.advanceTimersByTime(600);
    expect(cb).toHaveBeenCalledTimes(5);
  });
});

describe('readFileAsynchronously', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should call join with pathToFile', async () => {
    (join as jest.Mock).mockReturnValue('/fake/full/path');
    (existsSync as jest.Mock).mockReturnValue(false);

    const rel = 'data.txt';
    await readFileAsynchronously(rel);

    expect(join).toHaveBeenCalledTimes(1);
    expect(join).toHaveBeenCalledWith(expect.any(String), rel);
  });

  test('should return null if file does not exist', async () => {
    (join as jest.Mock).mockReturnValue('/fake/full/path');
    (existsSync as jest.Mock).mockReturnValue(false);

    const result = await readFileAsynchronously('missing.txt');

    expect(result).toBeNull();
    expect(readFile).not.toHaveBeenCalled();
  });

  test('should return file content if file exists', async () => {
    (join as jest.Mock).mockReturnValue('/fake/full/path');
    (existsSync as jest.Mock).mockReturnValue(true);
    (readFile as jest.Mock).mockResolvedValue(Buffer.from('HELLO'));

    const result = await readFileAsynchronously('ok.txt');

    expect(readFile).toHaveBeenCalledWith('/fake/full/path');
    expect(result).toBe('HELLO');
  });
});
