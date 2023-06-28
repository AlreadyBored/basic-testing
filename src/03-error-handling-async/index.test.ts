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
    // Write your test here
    const value = 'Hi!';
    const result = await resolveValue(value);
    expect(result).toBe(value);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    // Write your test here
    const message = 'Mistake!Sorry!';
    expect(() => throwError(message)).toThrow(Error);
    expect(() => throwError(message)).toThrow(message);
  });

  test('should throw error with default message if message is not provided', () => {
    // Write your test here
    const defaultMessage = 'Oops!';
    expect(() => throwError()).toThrow(Error);
    expect(() => throwError()).toThrow(defaultMessage);
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    // Write your test here
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    // Write your test here
    expect(() => rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });
});
