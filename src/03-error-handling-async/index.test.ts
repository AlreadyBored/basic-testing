// Uncomment the code below and write your tests
import {
  resolveValue,
  throwError,
  throwCustomError,
  rejectCustomError,
  MyAwesomeError,
} from './index';

describe('resolveValue', () => {
  test('should resolve the provided value', async () => {
    await expect(resolveValue(42)).resolves.toBe(42);
    const obj = { a: 1 };
    await expect(resolveValue(obj)).resolves.toBe(obj);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const message = 'Boom!';
    expect(() => throwError(message)).toThrow(message);
  });

  test('should throw error with default message if none provided', () => {
    expect(() => throwError()).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw MyAwesomeError', () => {
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject with MyAwesomeError', async () => {
    await expect(rejectCustomError()).rejects.toBeInstanceOf(MyAwesomeError);
  });
});
