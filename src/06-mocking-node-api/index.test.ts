import { doStuffByTimeout, doStuffByInterval } from '.';

const ms = 1000;
const cb = jest.fn();

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  test('should set timeout with provided cb and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(cb, ms);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(cb, ms);
  });

  test('should call cb only after timeout', () => {
    doStuffByTimeout(cb, ms);
    expect(cb).not.toHaveBeenCalled();

    jest.advanceTimersByTime(ms);
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
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  test('should set interval with provided cb and timeout', () => {
    jest.spyOn(global, 'setInterval');

    doStuffByInterval(cb, ms);

    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenCalledWith(cb, ms);
  });

  test('should call cb multiple times after multiple intervals', () => {
    //
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    //
  });

  test('should return null if file does not exist', async () => {
    //
  });

  test('should return file content if file exists', async () => {
    //
  });
});
