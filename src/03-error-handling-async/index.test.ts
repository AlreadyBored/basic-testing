import {
  resolveValue,
  throwError,
  throwCustomError,
  rejectCustomError,
  MyAwesomeError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const value = 'Resolved';
    const result = await resolveValue(value);
    expect(result).toBe(value);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const errorMessage = 'Error message';
    expect(() => throwError(errorMessage)).toThrowError(errorMessage);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrowError('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrowError(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrowError(MyAwesomeError);
  });
});
