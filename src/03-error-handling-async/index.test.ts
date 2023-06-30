import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    return expect(resolveValue('value')).resolves.toBe('value');
  }, 30000);
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(() => {
      throwError('Custom error message');
    }).toThrow('Custom error message');
  }, 30000);

  test('should throw error with default message if message is not provided', () => {
    expect(() => {
      throwError();
    }).toThrow('Oops!');
  }, 30000);
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => {
      throwCustomError();
    }).toThrow(MyAwesomeError);
  }, 30000);
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    return expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
  }, 30000);
});
