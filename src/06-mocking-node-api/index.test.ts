// Uncomment the code below and write your tests
import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';
import path from 'path';
import fs from 'fs';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    jest.spyOn(global, 'setTimeout')
    doStuffByTimeout(callback, 1000);
    expect(setTimeout).toHaveBeenCalledWith(callback, 1000);
  });

  test('should call callback only after timeout', () => {
    // Write your test here
    const callback = jest.fn();
    const TIMEOUT = 1000;
    doStuffByTimeout(callback, TIMEOUT);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(TIMEOUT/2);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(TIMEOUT/2);
    expect(callback).toHaveBeenCalled()
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
    const spySetInterval = jest.spyOn(global, 'setInterval');
    const INTERVAL = 1000;
    doStuffByInterval(callback, INTERVAL);
    expect(spySetInterval).toHaveBeenCalledWith(callback, INTERVAL);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const INTERVAL = 1000;
    doStuffByInterval(callback, INTERVAL);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(INTERVAL/2);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(INTERVAL/2);
    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(INTERVAL);
    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    // Write your test here
    const spyJoin = jest.spyOn(path,'join');
    const pathToFile = 'test.txt';
    await readFileAsynchronously(pathToFile);
    expect(spyJoin).toHaveBeenCalledWith(__dirname,pathToFile);
  });

  test('should return null if file does not exist', async () => {
    // Write your test here
    const pathToFile = 'nonexistent.txt';
    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    // Write your test here
    const pathToFile = 'test.txt';
    const fileContent = 'Hello, world!';
    jest.spyOn(fs,'existsSync').mockImplementation(()=>true);
    jest.spyOn(fs.promises, 'readFile').mockImplementation(async()=> Buffer.from(fileContent));
    const result = await readFileAsynchronously(pathToFile)
    expect(result).toBe(fileContent);
  });
});
