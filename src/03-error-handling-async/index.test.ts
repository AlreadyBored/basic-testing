import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    await expect(resolveValue('test value')).resolves.toBe('test value');
    await expect(resolveValue(123)).resolves.toBe(123);
    await expect(resolveValue(null)).resolves.toBeNull();
    await expect(resolveValue(undefined)).resolves.toBeUndefined();
    await expect(resolveValue({ key: 'value' })).resolves.toEqual({
      key: 'value',
    });
  });
});

describe('throwError', () => {
  const testMessage = 'Test error message';

  test('should throw error with provided message', () => {
    expect(() => throwError(testMessage)).toThrow(testMessage);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
  });

  test('should contain correct error message', () => {
    expect(() => throwCustomError()).toThrow(
      'This is my awesome custom error!',
    );
  });
});

describe('rejectCustomError', () => {
  test('should reject with MyAwesomeError instance', async () => {
    await expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });

  test('should contain correct error message', async () => {
    await expect(rejectCustomError()).rejects.toThrow(
      'This is my awesome custom error!',
    );
  });
});
