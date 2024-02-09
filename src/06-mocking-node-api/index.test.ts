// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout,  doStuffByInterval} from '.';
import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, 1000);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);

    jest.runAllTimers();

    expect(callback).toHaveBeenCalled();
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    
    doStuffByTimeout(callback, 1000);

    expect(callback).not.toHaveBeenCalled();

    jest.runAllTimers();

    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(1);
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
    const callback = jest.fn();
    jest.spyOn(global, 'setInterval');

    const interval = 1000; 

    doStuffByInterval(callback, interval);

    expect(setInterval).toHaveBeenCalledWith(callback, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const interval = 1000; 

    doStuffByInterval(callback, interval);

    jest.advanceTimersByTime(interval);
    jest.advanceTimersByTime(interval);
    jest.advanceTimersByTime(interval);

    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {

  afterEach(() => {
    jest.clearAllMocks();
  })

  test('should call join with pathToFile', async () => {
    const filename = 'text.txt';
    jest.spyOn(path, 'join');

    await readFileAsynchronously(filename);

    expect(path.join).toHaveBeenCalledWith(__dirname, filename);
  });

  test('should return null if file does not exist', async () => {
    const filename = 'text.txt';
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);

    const pathToFile = path.join(__dirname, filename);

    jest.mock('fs');

    const result = await readFileAsynchronously(filename);

    expect(fs.existsSync).toHaveBeenCalledWith(pathToFile);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {

    const filename = 'text.txt';
    const content = 'text inside text.txt';
    const pathToFile = path.join(__dirname, filename);

    jest.mock('fs');

    jest.spyOn(fsPromises, 'readFile').mockResolvedValue(content);
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);

    const result = await readFileAsynchronously(filename);

    expect(fs.promises.readFile).toHaveBeenCalledWith(pathToFile);
    expect(result).toBe(content);


  });
});
