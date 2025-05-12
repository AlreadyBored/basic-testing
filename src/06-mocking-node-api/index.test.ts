// Uncomment the code below and write your tests
import { join as joinOriginal } from 'path';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import { existsSync as existsSyncOriginal } from 'fs';
import { readFile as readFileOriginal } from 'fs/promises';

jest.mock('fs', () => ({
  ...jest.requireActual<typeof import('fs')>('fs'),
  existsSync: jest.fn(),
}));

jest.mock('fs/promises', () => ({
  ...jest.requireActual<typeof import('fs/promises')>('fs/promises'),
  readFile: jest.fn(),
}));

jest.mock('path', () => ({
  ...jest.requireActual<typeof import('path')>('path'),
  join: jest.fn(),
}));

const mockCallback = jest.fn();

const join = joinOriginal as jest.MockedFunction<typeof joinOriginal>;
const existsSync = existsSyncOriginal as jest.MockedFunction<
  typeof existsSyncOriginal
>;
const readFile = readFileOriginal as jest.MockedFunction<
  typeof readFileOriginal
>;

const testPathToFile = 'test-path-to-file';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    jest.spyOn(globalThis, 'setTimeout');
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    doStuffByTimeout(mockCallback, 1000);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 1000);
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(mockCallback, 1000);

    jest.runAllTimers();

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    jest.spyOn(globalThis, 'setInterval');
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    doStuffByInterval(mockCallback, 1000);

    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 1000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    doStuffByInterval(mockCallback, 1000);

    jest.advanceTimersByTime(3000);

    expect(mockCallback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should call join with pathToFile', async () => {
    await readFileAsynchronously(testPathToFile);

    const pathToFileArg = join.mock.calls[0]?.[1];

    expect(pathToFileArg).toBe(testPathToFile);
  });

  test('should return null if file does not exist', async () => {
    existsSync.mockReturnValue(false);

    await expect(readFileAsynchronously(testPathToFile)).resolves.toBe(null);
  });

  test('should return file content if file exists', async () => {
    const testContent = 'test-content';

    existsSync.mockReturnValue(true);
    readFile.mockResolvedValue(Buffer.from('test-content'));

    await expect(readFileAsynchronously(testPathToFile)).resolves.toBe(
      testContent,
    );
  });
});
