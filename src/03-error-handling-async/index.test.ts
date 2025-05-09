// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

const testValue = 'test-value';
const awesomeErrorMessage = 'This is my awesome custom error!';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    await expect(resolveValue(testValue)).resolves.toBe(testValue);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const throwErrorWithTestValue = () => {
      throwError(testValue);
    };

    expect(throwErrorWithTestValue).toThrow(Error);
    expect(throwErrorWithTestValue).toThrow(new Error(testValue));
  });

  test('should throw error with default message if message is not provided', () => {
    expect(throwError).toThrow(Error);
    expect(throwError).toThrow(new Error('Oops!'));
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(throwCustomError).toThrow(MyAwesomeError);
    expect(throwCustomError).toThrow(new Error(awesomeErrorMessage));
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError).rejects.toThrow(MyAwesomeError);
    await expect(rejectCustomError).rejects.toThrow(
      new Error(awesomeErrorMessage),
    );
  });
});
