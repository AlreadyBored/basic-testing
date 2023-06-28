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
    const testValue = 'testValue';

    const result = await resolveValue(testValue);

    expect(result).toBe(testValue);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const errorMsg = 'testError';

    expect(() => throwError(errorMsg)).toThrow(errorMsg);
  });

  test('should throw error with default message if message is not provided', () => {
    const defaultMsg = 'Oops!';

    expect(() => throwError()).toThrow(defaultMsg);
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
