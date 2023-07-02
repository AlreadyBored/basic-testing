import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    expect.hasAssertions();
    const result = await resolveValue('value');
    return expect(result).toBe('value');
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const message = 'Error';
    expect(() => throwError(message)).toThrow('Error');
  });

  test('should throw error with default message if message is not provided', () => {
    const defaultMessage = 'Oops!';
    expect(() => throwError()).toThrow(defaultMessage);
  });
});

describe('throwCustomError', () => {
  const customError = new MyAwesomeError();

  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(customError);
  });
});

describe('rejectCustomError', () => {
  const customError = new MyAwesomeError();

  test('should reject custom error', async () => {
    return await expect(() => rejectCustomError()).rejects.toThrow(customError);
  });
});