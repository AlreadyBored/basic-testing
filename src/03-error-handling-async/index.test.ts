import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const valueToResolve = 'I am resolved!';
    await expect(resolveValue(valueToResolve)).resolves.toBe(valueToResolve);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const errMsg = 'I am an error';
    expect(() => throwError(errMsg)).toThrowError(errMsg);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError(undefined)).toThrowError('Oops');
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
