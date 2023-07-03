// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';

const FILE = './file-for-reading.txt';

describe('doStuffByTimeout', () => {
  let timeout: number;
  let mockFn: () => Promise<string | null>;

  beforeAll(() => {
    jest.useFakeTimers();
    timeout = 1000;
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    mockFn = jest.fn();
    jest.spyOn(globalThis, 'setTimeout');
    doStuffByTimeout(mockFn, timeout);
    expect(setTimeout).toBeCalledWith(mockFn, timeout);
  });

  test('should call callback only after timeout', () => {
    mockFn = jest.fn();
    doStuffByTimeout(mockFn, timeout);
    expect(mockFn).not.toBeCalled();
    jest.runAllTimers();
    expect(mockFn).toBeCalled();
  });
});

describe('doStuffByInterval', () => {
  let timeout: number;
  let mockFn: () => Promise<string | null>;

  beforeAll(() => {
    jest.useFakeTimers();
    timeout = 1000;
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    mockFn = jest.fn();
    jest.spyOn(globalThis, 'setInterval');
    doStuffByInterval(mockFn, timeout);
    expect(setInterval).toBeCalledWith(mockFn, timeout);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const times = 5;
    mockFn = jest.fn();
    doStuffByInterval(mockFn, timeout);
    expect(mockFn).not.toBeCalled();
    jest.advanceTimersByTime(timeout * times);
    expect(mockFn).toHaveBeenCalledTimes(times);
  });
});

describe('readFileAsynchronously', () => {
  let mockFn: () => Promise<string | null>;

  beforeEach(() => {
    mockFn = async () => await readFileAsynchronously(FILE);
  })

  test('should call join with pathToFile', async () => {
    const joinListener = jest.spyOn(path, 'join');
    await mockFn();
    expect(joinListener).toHaveBeenCalledWith(__dirname, FILE);
  });

  test('should return null if file does not exist', async () => {
    const mockWrongFn = async () => await readFileAsynchronously("wrong path");
    expect(await mockWrongFn()).toBeNull();
  });

  test('should return file content if file exists', async () => {
    expect(await mockFn()).not.toBeNull();
  });
});
