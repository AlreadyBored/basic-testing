// Uncomment the code below and write your tests
import { throwError, throwCustomError, resolveValue, MyAwesomeError, rejectCustomError } from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const value = 'test';
    const promiseAnswer = await resolveValue(value);
    expect(promiseAnswer).toBe(value);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const errMessage = 'test text';
    expect(() => throwError(errMessage)).toThrowError(errMessage);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(throwError).toThrowError('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(throwCustomError).toThrowError(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    expect(rejectCustomError).rejects.toThrowError(MyAwesomeError);
  });
});
