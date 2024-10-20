// Uncomment the code below and write your tests
// import { throwError, throwCustomError, resolveValue, MyAwesomeError, rejectCustomError } from './index';

import {
  MyAwesomeError,
  rejectCustomError,
  resolveValue,
  throwCustomError,
  throwError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const value = 'someValue';
    await expect(resolveValue(value)).resolves.toBe(value);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const message = 'Message: Operation failed';
    expect(() => throwError(message)).toThrowError(new Error(message));
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow('Oops!');
  });
});

describe('throwCustomError', (): void => {
  test('should throw custom error', (): void => {
    expect(() => throwCustomError()).toThrowError(MyAwesomeError);
  });
});

describe('rejectCustomError', (): void => {
  test('should reject custom error', async (): Promise<void> => {
    await expect(rejectCustomError()).rejects.toThrowError(MyAwesomeError);
  });
});
