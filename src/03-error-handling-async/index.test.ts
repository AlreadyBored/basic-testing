// Uncomment the code below and write your tests
import {
  resolveValue,
  throwCustomError,
  throwError,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const arg = 10;
    const response = await resolveValue(arg);
    expect(response).toBe(arg);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const errorMsg = 'Custom Error';
    expect(() => {
      throwError(errorMsg);
    }).toThrow(errorMsg);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => {
      throwError();
    }).toThrow();
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => {
      throwCustomError();
    }).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });
});
