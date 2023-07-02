import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    await expect(resolveValue(6)).resolves.toBe(6);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const ERROR_MESSAGE = 'Hello there';
    expect(() => throwError(ERROR_MESSAGE)).toThrow(ERROR_MESSAGE);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(throwError).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(throwCustomError).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError).rejects.toBeInstanceOf(MyAwesomeError);
  });
});
