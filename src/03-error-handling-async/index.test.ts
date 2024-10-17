// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const resolvedValue = 'test';

    await expect(resolveValue(resolvedValue)).resolves.toBe(resolvedValue);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const message = 'My error message';

    expect(() => throwError(message)).toThrow(message);
  });

  test('should throw error with default message if message is not provided', () => {
    const message = 'Oops!';

    expect(() => throwError()).toThrow(message);
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });
});
