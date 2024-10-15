import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe(resolveValue.name, () => {
  test('should resolve provided value', async () => {
    const testValue = 'value';
    const result = await resolveValue(testValue);

    expect(result).toBe(testValue);
  });
});

describe(throwError.name, () => {
  test('should throw error with provided message', () => {
    const errorMsg = 'Custom message';
    expect(() => throwError(errorMsg)).toThrow(errorMsg);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow('Oops!');
  });
});

describe(throwCustomError.name, () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
  });
});

describe(rejectCustomError.name, () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrowError(MyAwesomeError);
  });
});
