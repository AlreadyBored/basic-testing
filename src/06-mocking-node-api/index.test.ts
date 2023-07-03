import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

// jest.mock('path');

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const spy = jest.spyOn(global, 'setTimeout');
    const cb = jest.fn();
    doStuffByTimeout(cb, 100);
    expect(spy).toHaveBeenCalledWith(cb, 100);
  });

  test('should call callback only after timeout', () => {
    const cb = jest.fn();
    doStuffByTimeout(cb, 10);
    expect(cb).not.toBeCalled();
    jest.runOnlyPendingTimers();
    expect(cb).toBeCalled();
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
    const spy = jest.spyOn(global, 'setInterval');
    const cb = jest.fn();
    doStuffByInterval(cb, 100);
    expect(spy).toHaveBeenCalledWith(cb, 100);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const cb = jest.fn();
    doStuffByInterval(cb, 99);
    jest.advanceTimersByTime(1000);
    expect(cb).toHaveBeenCalledTimes(10);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    // Write your test here
    // const path = jest.createMockFromModule<typeof import('path')>('path');
    // path.join = jest.fn();
    // // jest.mock('path');
    // readFileAsynchronously('index');
    // expect(jest.isMockFunction(path.join)).toBeTruthy();
    // expect(path.join).toHaveBeenCalled();
  });

  test('should return null if file does not exist', async () => {
    expect(await readFileAsynchronously('non_existing.file')).toBeNull();
  });

  test('should return file content if file exists', async () => {
    expect(await readFileAsynchronously('test-file.txt')).toBe('some content');
  });
});
