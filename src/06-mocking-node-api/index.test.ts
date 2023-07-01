// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import { join } from 'path';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 5000;
    doStuffByTimeout(callback, timeout);
    expect(callback).not.toHaveBeenCalled();
    jest.runAllTimers();
    expect(callback).toHaveBeenCalled();
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 5000;
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

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const interval = 3000;

    doStuffByInterval(callback, interval);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalled();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const interval = 3000;

    doStuffByInterval(callback, interval);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(interval * 3);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

jest.mock('path', () => ({
  join: jest.fn((...args) => args.join('/')),
}));

jest.mock('fs', () => ({
  existsSync: jest.fn(),
}));

jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
}));

describe('readFileAsynchronously', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('should call join with pathToFile', async () => {
    const pathToFile = 'test.txt';
    (existsSync as jest.MockedFunction<typeof existsSync>).mockReturnValue(
      true,
    );
    (readFile as jest.MockedFunction<typeof readFile>).mockResolvedValue(
      Buffer.from('Test content'),
    );

    await readFileAsynchronously(pathToFile);

    expect(join).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = 'nonExistent.txt';
    (existsSync as jest.MockedFunction<typeof existsSync>).mockReturnValue(
      false,
    );

    const result = await readFileAsynchronously(pathToFile);

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const pathToFile = 'test.txt';
    const fileContent = 'Test content';
    (existsSync as jest.MockedFunction<typeof existsSync>).mockReturnValue(
      true,
    );
    (readFile as jest.MockedFunction<typeof readFile>).mockResolvedValue(
      Buffer.from(fileContent),
    );

    const result = await readFileAsynchronously(pathToFile);

    expect(result).toBe(fileContent);
  });
});
