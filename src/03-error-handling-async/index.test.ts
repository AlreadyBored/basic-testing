import { throwError, throwCustomError, resolveValue, MyAwesomeError, rejectCustomError } from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const value = "ProvidedValue";
    const result = await resolveValue(value);
    expect(result).toBe(value);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const value = "This is an error message";
    expect(() => throwError(value)).toThrow(value);
  });

  test('should throw error with default message if message is not provided', () => {
    const defaultValue = "Oops!";
    expect(() => throwError()).toThrow(defaultValue);
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => {throwCustomError();}).toThrow(new MyAwesomeError());
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrow(new MyAwesomeError());
  });
});
