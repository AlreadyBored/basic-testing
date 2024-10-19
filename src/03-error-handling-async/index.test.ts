// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

const LUCKY_NUMBER = 777;
const CUSTOM_ERROR_TEXT = 'So stupid mistake';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const result = await resolveValue(LUCKY_NUMBER);
    expect(result).toBe(LUCKY_NUMBER);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(() => throwError(CUSTOM_ERROR_TEXT)).toThrow(CUSTOM_ERROR_TEXT);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
    expect(() => throwCustomError()).toThrow(
      'This is my awesome custom error!',
    );
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
    await expect(rejectCustomError()).rejects.toThrow(
      'This is my awesome custom error!',
    );
  });
});
