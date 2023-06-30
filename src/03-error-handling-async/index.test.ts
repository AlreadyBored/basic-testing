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
    await expect(resolveValue(2)).resolves.toBe(2);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(()=> throwError('hehe')).toThrow('hehe');
  });

  test('should throw error with default message if message is not provided', () => {
    expect(()=> throwError()).toThrow();
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toBeInstanceOf(MyAwesomeError);
  });
});
