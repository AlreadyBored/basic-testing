import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import path from 'path';

const TEST_FILE_NAME = 'test.txt';
const TIMEOUT_DURATION = 1000;
const INTERVAL_DURATION = 1000;
const FILE_CONTENT = 'test file content';

jest.mock('fs', () => ({
  ...jest.requireActual('fs'),
  existsSync: jest.fn(),
}));

jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
}));

jest.mock('path', () => ({
  join: jest.fn(),
}));

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();

    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, TIMEOUT_DURATION);

    expect(setTimeout).toHaveBeenCalledWith(callback, TIMEOUT_DURATION);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();

    doStuffByTimeout(callback, TIMEOUT_DURATION);

    jest.advanceTimersByTime(TIMEOUT_DURATION);
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
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, INTERVAL_DURATION);

    expect(setInterval).toHaveBeenCalledWith(callback, INTERVAL_DURATION);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, INTERVAL_DURATION);

    jest.advanceTimersByTime(INTERVAL_DURATION * 3);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should call join with pathToFile', async () => {
    await readFileAsynchronously(TEST_FILE_NAME);

    expect(path.join).toHaveBeenCalledWith(__dirname, TEST_FILE_NAME);
  });

  test('should return null if file does not exist', async () => {
    (existsSync as jest.Mock).mockReturnValue(false);
    const result = await readFileAsynchronously(TEST_FILE_NAME);

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    (existsSync as jest.Mock).mockReturnValue(true);
    (readFile as jest.Mock).mockResolvedValue(Buffer.from(FILE_CONTENT));

    const result = await readFileAsynchronously(TEST_FILE_NAME);

    expect(result).toBe(FILE_CONTENT);
  });
});
