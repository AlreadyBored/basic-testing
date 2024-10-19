/* eslint-disable prettier/prettier */
// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';
describe('resolveValue', (): void => {
  test('should resolve provided value', async (): Promise<void> => {
    const value = 'Resolved value';
    await expect(resolveValue(value)).resolves.toBe(value);
  });
});

describe('throwError', (): void => {
  test('should throw error with provided message', (): void => {
    const msg = 'Operation failed';
    expect(() => throwError(msg)).toThrowError(new Error(msg));
  });

  test('should throw error with default message if message is not provided', (): void => {
    const defaultMessage = 'message is not provided';
    expect(() => throwError()).toThrowError(new Error(defaultMessage));
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
