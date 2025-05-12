// Uncomment the code below and write your tests
import path from 'path';
import { existsSync } from 'fs';
import { readFile as readFilePromise } from 'fs/promises';

import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';

jest.mock('fs', () => ({
  existsSync: jest.fn(),
}));

jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
}));

const existsSyncMock = existsSync as jest.MockedFunction<typeof existsSync>;
const readFileMock = readFilePromise as jest.MockedFunction<
  typeof readFilePromise
>;

describe('doStuffByTimeout', () => {
  beforeAll(() => jest.useFakeTimers());
  afterAll(() => jest.useRealTimers());
  afterEach(() => jest.clearAllMocks());

  test('should set timeout with provided callback and timeout', () => {
    const cb = jest.fn();
    const timeout = 5000;

    const spy = jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(cb, timeout);

    expect(spy).toHaveBeenCalledWith(cb, timeout);
  });

  test('should call callback only after timeout', () => {
    const cb = jest.fn();
    const timeout = 3000;

    doStuffByTimeout(cb, timeout);

    expect(cb).not.toHaveBeenCalled();

    jest.advanceTimersByTime(timeout);
    expect(cb).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => jest.useFakeTimers());
  afterAll(() => jest.useRealTimers());
  afterEach(() => jest.clearAllMocks());

  test('should set interval with provided callback and interval', () => {
    const cb = jest.fn();
    const interval = 2000;

    const spy = jest.spyOn(global, 'setInterval');

    doStuffByInterval(cb, interval);

    expect(spy).toHaveBeenCalledWith(cb, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const cb = jest.fn();
    const interval = 1000;

    doStuffByInterval(cb, interval);

    jest.advanceTimersByTime(interval * 3);
    expect(cb).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should call path.join with __dirname and pathToFile', async () => {
    const joinSpy = jest.spyOn(path, 'join');

    existsSyncMock.mockReturnValue(false); // avoid real FS access

    await readFileAsynchronously('data.txt');

    expect(joinSpy).toHaveBeenCalledWith(__dirname, 'data.txt');
  });

  test('should return null if file does not exist', async () => {
    existsSyncMock.mockReturnValue(false);

    const result = await readFileAsynchronously('missing.txt');

    expect(result).toBeNull();
    expect(readFileMock).not.toHaveBeenCalled();
  });

  test('should return file content if file exists', async () => {
    existsSyncMock.mockReturnValue(true);
    readFileMock.mockResolvedValue(Buffer.from('Hello, Jest!'));

    const result = await readFileAsynchronously('file.txt');

    expect(result).toBe('Hello, Jest!');
    expect(readFileMock).toHaveBeenCalled();
  });
});
