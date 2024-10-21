import { throwError, throwCustomError, resolveValue, MyAwesomeError, rejectCustomError } from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    await expect(resolveValue('test value')).resolves.toBe('test value');
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(() => throwError('message')).toThrowError(new Error('message'));
    expect(() => throwError('message')).toThrow('message');
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrowError(new Error('Oops!'));
    expect(() => throwError()).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrowError(MyAwesomeError);
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrowError(MyAwesomeError);
    await expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });
});
