import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    expect(await resolveValue(42)).toBe(42);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(() => throwError()).toThrow('Oops!');
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrowError();
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
