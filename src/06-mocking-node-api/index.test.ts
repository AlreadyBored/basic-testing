import {
  readFileAsynchronously,
  doStuffByTimeout,
  doStuffByInterval,
} from './index';
import * as path from 'path';

jest.mock('fs', () => ({
  existsSync: jest.fn(),
}));

jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
}));

import { existsSync } from 'fs';
import { readFile } from 'fs/promises';

describe('doStuffByTimeout', () => {
  let timeoutSpy: jest.SpyInstance;

  beforeAll(() => {
    jest.useFakeTimers();
    timeoutSpy = jest.spyOn(global, 'setTimeout');
  });

  afterAll(() => {
    jest.useRealTimers();
    timeoutSpy.mockRestore();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);
    jest.runAllTimers(); // <-- advance timers to trigger setTimeout
    expect(callback).toHaveBeenCalled();
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  let intervalSpy: jest.SpyInstance;

  beforeAll(() => {
    jest.useFakeTimers();
    intervalSpy = jest.spyOn(global, 'setInterval');
  });

  afterAll(() => {
    jest.useRealTimers();
    intervalSpy.mockRestore();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, 500);
    jest.advanceTimersByTime(1500); // <-- simulate 3 intervals
    expect(callback).toHaveBeenCalledTimes(3);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, 500);
    jest.advanceTimersByTime(1500);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  const fakePath = 'test.txt';
  const fullPath = path.join(__dirname, fakePath);

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return file content if file exists', async () => {
    (existsSync as jest.Mock).mockReturnValue(true);
    (readFile as jest.Mock).mockResolvedValue(
      Buffer.from('Hello, Hushnudbek!'),
    );

    const result = await readFileAsynchronously(fakePath);
    expect(result).toBe('Hello, Hushnudbek!');
    expect(readFile).toHaveBeenCalledWith(path.join(__dirname, fakePath));
  });

  test('should return null if file does not exist', async () => {
    (existsSync as jest.Mock).mockReturnValue(false);
    const result = await readFileAsynchronously(fakePath);
    expect(result).toBeNull();
    expect(readFile).not.toHaveBeenCalled();
  });

  test('should return file content if file exists', async () => {
    (existsSync as jest.Mock).mockReturnValue(true);
    (readFile as jest.Mock).mockResolvedValue(
      Buffer.from('Hello, Hushnudbek!'),
    );
    const result = await readFileAsynchronously(fakePath);
    expect(result).toBe('Hello, Hushnudbek!');
    expect(readFile).toHaveBeenCalledWith(fullPath);
  });
});
