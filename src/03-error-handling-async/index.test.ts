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
    return expect(resolveValue('some value')).resolves.toBe('some value');
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(() => {
      throwError('some message');
    }).toThrow(new Error('some message'));
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => {
      throwError();
    }).toThrow(new Error('Oops!'));
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => {
      throwCustomError();
    }).toThrow(new MyAwesomeError());
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    return expect(rejectCustomError()).rejects.toThrow(new MyAwesomeError());
  });
});
