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
    expect.hasAssertions();
    await expect(resolveValue('x')).resolves.toEqual('x');
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(() => throwError('error')).toThrow('error');
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow(new Error('Oops!'));
  });
});

describe('throwCustomError', () => {
  const e = new MyAwesomeError();
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(e);
  });
});

describe('rejectCustomError', () => {
  const e = new MyAwesomeError();
  test('should reject custom error', async () => {
    return await expect(() => rejectCustomError()).rejects.toThrow(e);
  });
});
