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
    await expect(resolveValue('Hello Async')).resolves.toBe('Hello Async');
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const errorMessage = 'Something goes wrong...';
    const result = () => throwError(errorMessage);

    expect(result).toThrow(errorMessage);
  });

  test('should throw error with default message if message is not provided', () => {
    const result = () => throwError();

    expect(result).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    const result = () => throwCustomError();

    expect(result).toThrow(MyAwesomeError);
    expect(result).toThrow('This is my awesome custom error!');
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(() => rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });
});
