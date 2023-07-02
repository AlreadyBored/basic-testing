import { TIMEOUT_TEST } from 'utils';
import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test(
    'should resolve provided value',
    async () => {
      const value = 'hello world';
      expect(await resolveValue(value)).toBe(value);
    },
    TIMEOUT_TEST,
  );
});

describe('throwError', () => {
  test(
    'should throw error with provided message',
    () => {
      const erorMsg = 'eror message';
      expect(() => {
        throwError(erorMsg);
      }).toThrowError(erorMsg);
    },
    TIMEOUT_TEST,
  );

  test(
    'should throw error with default message if message is not provided',
    () => {
      expect(throwError).toThrowError(Error('Oops!'));
    },
    TIMEOUT_TEST,
  );
});

describe('throwCustomError', () => {
  test(
    'should throw custom error',
    () => {
      expect(throwCustomError).toThrowError(MyAwesomeError);
    },
    TIMEOUT_TEST,
  );
});

describe('rejectCustomError', () => {
  test(
    'should reject custom error',
    async () => {
      await expect(rejectCustomError).rejects.toThrowError(MyAwesomeError);
    },
    TIMEOUT_TEST,
  );
});
