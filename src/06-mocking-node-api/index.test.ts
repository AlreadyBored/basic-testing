import path from 'path';
import { existsSync } from 'fs';
import fsPromises from 'fs/promises';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

const fileName = 'file.md';

jest.mock('fs');
jest.mock('fs/promises');

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    jest.spyOn(global, 'setTimeout');
  });

  test('should set timeout with provided callback and timeout', () => {
    const cb = jest.fn();

    doStuffByTimeout(cb, 500);
    expect(setTimeout).toBeCalledWith(cb, 500);
  });

  test('should call callback only after timeout', () => {
    const cb = jest.fn();

    doStuffByTimeout(cb, 500);
    expect(cb).not.toBeCalled();

    jest.advanceTimersByTime(500);
    expect(cb).toBeCalledTimes(1);
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
    jest.spyOn(global, 'setInterval');
  });

  test('should set interval with provided callback and timeout', () => {
    const cb = jest.fn();

    doStuffByInterval(cb, 500);
    expect(setInterval).toBeCalledWith(cb, 500);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const cb = jest.fn();

    doStuffByInterval(cb, 500);
    expect(cb).not.toBeCalled();

    jest.advanceTimersByTime(500);
    expect(cb).toBeCalledTimes(1);

    jest.advanceTimersByTime(500);
    expect(cb).toBeCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const spy = jest.spyOn(path, 'join');
    await readFileAsynchronously(fileName);

    expect(spy).toBeCalledWith(__dirname, fileName);
  });

  test('should return null if file does not exist', async () => {
    (existsSync as jest.Mock).mockReturnValue(false);

    const fileContent = await readFileAsynchronously(fileName);
    expect(fileContent).toBeNull();
  });

  test('should return file content if file exists', async () => {
    (existsSync as jest.Mock).mockReturnValue(true);

    jest.spyOn(fsPromises, 'readFile').mockResolvedValue('content');
    const fileContent = await readFileAsynchronously(fileName);
    expect(typeof fileContent).toBe('string');
  });
});
