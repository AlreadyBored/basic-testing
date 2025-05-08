import { join } from 'path';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';

jest.mock('fs');
jest.mock('fs/promises');
jest.mock('path');

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeoutSpy = jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, 2000);
    expect(timeoutSpy).toHaveBeenCalledWith(callback, 2000);
    expect(callback).not.toHaveBeenCalled();

    timeoutSpy.mockRestore();
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
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const intervalSpy = jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, 1000);
    expect(intervalSpy).toHaveBeenCalledWith(callback, 1000);
    expect(callback).not.toHaveBeenCalled();

    intervalSpy.mockRestore();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();

    doStuffByInterval(callback, 1000);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should call join with pathToFile', async () => {
    const mockJoin = join as jest.Mock;
    mockJoin.mockReturnValue('/full/path/test.txt');
    await readFileAsynchronously('test.txt');
    expect(join).toHaveBeenCalledWith(__dirname, 'test.txt');
  });

  test('should return null if file does not exist', async () => {
    (existsSync as jest.Mock).mockReturnValue(false);
    (join as jest.Mock).mockReturnValue('/full/path/random.txt');

    const res = await readFileAsynchronously('random.txt');
    expect(res).toBeNull();
    expect(readFile).not.toHaveBeenCalled();
  });

  test('should return file content if file exists', async () => {
    const fileContent = Buffer.from('Hello');

    (existsSync as jest.Mock).mockReturnValue(true);
    (join as jest.Mock).mockReturnValue('/full/path/test.txt');
    (readFile as jest.Mock).mockResolvedValue(fileContent);

    const res = await readFileAsynchronously('test.txt');
    expect(readFile).toHaveBeenCalledWith('/full/path/test.txt');
    expect(res).toBe('Hello');
  });
});
