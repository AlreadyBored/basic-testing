import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  // TODO: I'm not sure
  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalled();
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);
    expect(callback).not.toBeCalled();
    jest.runAllTimers();
    expect(callback).toBeCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  // TODO: I'm not sure
  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, 1000);
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalled();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, 1000);
    expect(callback).not.toHaveBeenCalled();
    jest.runOnlyPendingTimers();
    expect(callback).toHaveBeenCalled();
    jest.runOnlyPendingTimers();
    expect(callback).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const spyJoin = jest.spyOn(jest.requireActual('path'), 'join');
    readFileAsynchronously('somePath');
    expect(spyJoin).toHaveBeenCalledWith(expect.any(String), 'somePath');
  });

  // TODO: I think it works correctly, but make sure
  test('should return null if file does not exist', async () => {
    jest.spyOn(jest.requireActual('fs'), 'existsSync').mockReturnValue(false);
    const fileContent = await readFileAsynchronously('nonexistentFile');
    expect(fileContent).toBe(null);
  });

  // TODO: I think it works correctly, but make sure
  test('should return file content if file exists', async () => {
    jest.spyOn(jest.requireActual('fs'), 'existsSync').mockReturnValue(true);
    jest
      .spyOn(jest.requireActual('fs/promises'), 'readFile')
      .mockReturnValue('data');
    const fileContent = await readFileAsynchronously('existingFile');
    expect(fileContent).toBe('data');
  });
});
