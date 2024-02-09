import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    try {
      const toTest = 'text';
      const resolve = await resolveValue(toTest);
      expect(resolve).toBe(toTest);
    } catch (e) {
      console.error(e);
    }
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const myErrorText = 'Error';
    expect(() => throwError(myErrorText)).toThrowError(myErrorText);
  });

  test('should throw error with default message if message is not provided', () => {
    const myErrorText = '';
    expect(() => throwError(myErrorText)).toThrowError();
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });
});
