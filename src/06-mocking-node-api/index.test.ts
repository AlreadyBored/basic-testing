// Uncomment the code below and write your tests
import path from 'path';
import fs from 'fs';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

const dummy = () => 0;
const providedTimeout = 1500;

describe('doStuffByTimeout', () => {
  let spyTimeout: jest.SpyInstance;

  beforeEach(() => {
    spyTimeout = jest.spyOn(global, 'setTimeout');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    // Write your test here
    doStuffByTimeout(dummy, providedTimeout);
    expect(spyTimeout).toBeCalledWith(dummy, providedTimeout);
  });

  test('should call callback only after timeout', () => {
    // Write your test here
    const providedCallback = jest.fn(dummy);

    doStuffByTimeout(providedCallback, providedTimeout);

    expect(providedCallback).not.toBeCalled();

    jest.advanceTimersByTime(providedTimeout);
    expect(providedCallback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  let spyInterval: jest.SpyInstance;

  beforeEach(() => {
    spyInterval = jest.spyOn(global, 'setInterval');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    // Write your test here
    doStuffByInterval(dummy, providedTimeout);
    expect(spyInterval).toBeCalledWith(dummy, providedTimeout);
  });

  test('should call callback multiple times after multiple intervals', () => {
    // Write your test here
    const providedCallback = jest.fn(dummy);

    doStuffByInterval(providedCallback, providedTimeout);

    expect(providedCallback).not.toBeCalled();

    jest.advanceTimersByTime(providedTimeout);
    expect(providedCallback).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(providedTimeout);
    expect(providedCallback).toHaveBeenCalledTimes(2);
    jest.advanceTimersByTime(providedTimeout);
    expect(providedCallback).toHaveBeenCalledTimes(3);
    jest.advanceTimersByTime(providedTimeout);
    expect(providedCallback).toHaveBeenCalledTimes(4);
    jest.advanceTimersByTime(providedTimeout);
    expect(providedCallback).toHaveBeenCalledTimes(5);
  });
});

describe('readFileAsynchronously', () => {
  const mockFilePath = 'test.txt';
  const mockFileContent = 'test file content';
  let mockJoin: jest.SpyInstance;
  let mockExistsSync: jest.SpyInstance;
  let mockReadFile;

  beforeEach(() => {
    mockJoin = jest.spyOn(path, 'join');
    mockExistsSync = jest.spyOn(fs, 'existsSync');
    mockExistsSync.mockReturnValue(false);
    mockReadFile = jest.spyOn(fs.promises, 'readFile');
    mockReadFile.mockResolvedValue(mockFileContent);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should call join with pathToFile', async () => {
    // Write your test here
    await readFileAsynchronously(mockFilePath);
    expect(mockJoin).toBeCalled();
  });

  test('should return null if file does not exist', async () => {
    // Write your test here
    await expect(readFileAsynchronously(mockFilePath)).resolves.toBeNull();
  });

  test('should return file content if file exists', async () => {
    // Write your test here
    mockExistsSync.mockReturnValueOnce(true);
    await expect(readFileAsynchronously(mockFilePath)).resolves.toBe(
      mockFileContent,
    );
  });
});
