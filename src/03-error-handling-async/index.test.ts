import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const value = 'test';
    await expect(resolveValue(value)).resolves.toBe(value);
  });

  test('should resolve undefined if no value is provided', async () => {
    await expect(resolveValue(undefined)).resolves.toBeUndefined();
  });
});

describe('throwError', () => {
  test('should throw error with provided message', async () => {
    const message = 'Custom error message';
    expect(() => throwError(message)).toThrow(message);
  });

  test('should throw error with default message if message is not provided', async () => {
    expect(() => throwError()).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', async () => {
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
    expect(() => throwCustomError()).toThrow(
      'This is my awesome custom error!',
    );
  });

  test('should throw an instance of MyAwesomeError', async () => {
    try {
      throwCustomError();
    } catch (error) {
      expect(error).toBeInstanceOf(MyAwesomeError);
    }
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
    await expect(rejectCustomError()).rejects.toThrow(
      'This is my awesome custom error!',
    );
  });

  test('should reject with an instance of MyAwesomeError', async () => {
    try {
      await rejectCustomError();
    } catch (error) {
      expect(error).toBeInstanceOf(MyAwesomeError);
    }
  });
});
