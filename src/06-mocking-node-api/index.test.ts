import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'node:path';
import fsPromises from 'node:fs/promises';
import fs from 'node:fs';

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
    const callback = jest.fn(/*() => console.log('I am mock function')*/); // mock function
    const timeout = 100;
    doStuffByTimeout(callback, timeout);
    expect(setTimeout).toBeCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn(/*() =>  console.log('I am mock function')*/); // mock function
    const timeout = 100;

    doStuffByTimeout(callback, timeout);
    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(timeout);
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

  beforeEach(() => {
    jest.spyOn(global, 'setInterval');
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn(/*() => console.log('I am mock function')*/); // mock function
    const timeout = 100;
    doStuffByInterval(callback, timeout);
    expect(setInterval).toBeCalledWith(callback, timeout);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn(/*() => console.log('I am mock function')*/); // mock function
    const timeout = 100;
    const repeat = 5;
    doStuffByInterval(callback, timeout);
    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(timeout * repeat);
    expect(callback).toBeCalledTimes(repeat);
  });
});

describe('readFileAsynchronously', () => {
  jest.mock('fs/promises');
  jest.mock('fs');
  const filePath = './phantom-file.txt';

  test('should call join with pathToFile', async () => {
    const fakeJoin = jest.spyOn(path, 'join');
    await readFileAsynchronously(filePath);
    expect(fakeJoin).toBeCalledWith(__dirname, filePath);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const content = await readFileAsynchronously(filePath);
    expect(content).toBe(null);
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    const fakeContent = 'Tests are for half-hearted, but we are brave!';
    jest.spyOn(fsPromises, 'readFile').mockResolvedValue(fakeContent);
    const readContent = await readFileAsynchronously(filePath);
    expect(readContent).toBe(fakeContent);
  });
});
