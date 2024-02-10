// Uncomment the code below and write your tests
// import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

import {
  doStuffByInterval,
  doStuffByTimeout,
  readFileAsynchronously,
} from './index';
import { join } from 'path';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    // Write your test here
    const cb = jest.fn();
    const timerSpy = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(cb, 1000);
    expect(timerSpy).toHaveBeenCalledTimes(1);
    expect(timerSpy).toHaveBeenCalledWith(expect.any(Function), 1000);
    timerSpy.mockRestore();
  });

  test('should call callback only after timeout', () => {
    // Write your test here
    const cb = jest.fn();
    doStuffByTimeout(cb, 1000);
    expect(cb).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1000);
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

  test('should set interval with provided callback and timeout', () => {
    // Write your test here
    const cb = jest.fn();
    const timerSpy = jest.spyOn(global, 'setInterval');
    doStuffByInterval(cb, 1000);
    expect(timerSpy).toHaveBeenCalledTimes(1);
    expect(timerSpy).toHaveBeenCalledWith(expect.any(Function), 1000);
    timerSpy.mockRestore();
  });

  test('should call callback multiple times after multiple intervals', () => {
    // Write your test here
    const cb = jest.fn();
    doStuffByInterval(cb, 1000);
    expect(cb).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1000);
    expect(cb).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(1000);
    expect(cb).toHaveBeenCalledTimes(2);
    jest.advanceTimersByTime(1000);
    expect(cb).toHaveBeenCalledTimes(3);
  });
});

jest.mock('path', () => ({
  join: jest.fn(),
}));
jest.mock('fs', () => ({
  existsSync: jest.fn().mockReturnValue(false),
}));

describe('readFileAsynchronously', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('should call join with pathToFile', async () => {
    // Write your test here
    await readFileAsynchronously('example.ts');
    expect(join).toHaveBeenCalledWith(__dirname, 'example.ts');
  });

  test('should return null if file does not exist', async () => {
    // Write your test here
    const data = await readFileAsynchronously('example.ts');
    expect(data).toBeNull();
  });

  test('should return file content if file exists', async () => {
    // Write your test here
    const data = await readFileAsynchronously('./index.ts');
    expect(data).toBeDefined();
  });
});
