import { TIMEOUT_TEST } from 'utils';
import path from 'path';
import { readFile } from 'fs/promises';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

const FUNCTION_TIMEOUT = 1000;
const callback = jest.fn();

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  test(
    'should set timeout with provided callback and timeout',
    () => {
      const spy = jest.spyOn(global, 'setTimeout');

      doStuffByTimeout(callback, FUNCTION_TIMEOUT);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(callback, FUNCTION_TIMEOUT);
    },
    TIMEOUT_TEST,
  );

  test(
    'should call callback only after timeout',
    () => {
      doStuffByTimeout(callback, FUNCTION_TIMEOUT);

      expect(callback).not.toBeCalled();

      jest.runAllTimers();

      expect(callback).toHaveBeenCalledTimes(1);
    },
    TIMEOUT_TEST,
  );
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  test(
    'should set interval with provided callback and timeout',
    () => {
      const spy = jest.spyOn(global, 'setInterval');

      doStuffByInterval(callback, FUNCTION_TIMEOUT);

      expect(spy).toHaveBeenCalledWith(callback, FUNCTION_TIMEOUT);
    },
    TIMEOUT_TEST,
  );

  test(
    'should call callback multiple times after multiple intervals',
    () => {
      const iterations = 3;

      doStuffByInterval(callback, FUNCTION_TIMEOUT);

      jest.advanceTimersByTime(FUNCTION_TIMEOUT * iterations);

      expect(callback).toHaveBeenCalledTimes(iterations);
    },
    TIMEOUT_TEST,
  );
});

describe('readFileAsynchronously', () => {
  test(
    'should call join with pathToFile',
    async () => {
      const spy = jest.spyOn(path, 'join');

      const pathToFile = 'some-path/file.ext';

      await readFileAsynchronously(pathToFile);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(__dirname, pathToFile);
    },
    TIMEOUT_TEST,
  );

  test(
    'should return null if file does not exist',
    async () => {
      expect(
        await readFileAsynchronously('this-file-does-not-exist.ext'),
      ).toBeNull();
    },
    TIMEOUT_TEST,
  );

  test(
    'should return file content if file exists',
    async () => {
      const fileName = 'index.ts';

      const fileContent = (
        await readFile(path.join(__dirname, fileName))
      ).toString();

      expect(await readFileAsynchronously(fileName)).toBe(fileContent);
    },
    TIMEOUT_TEST,
  );
});
