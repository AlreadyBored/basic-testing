// Uncomment the code below and write your tests
import { resolveValue, throwError, throwCustomError,MyAwesomeError, rejectCustomError } from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
   const testingValue = 5
   expect(await resolveValue(testingValue)).toBe(testingValue);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const errorMessage = 'Errro message'
    expect(()=>throwError(errorMessage)).toThrow(errorMessage)
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow('Oops!');

  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(()=>throwCustomError()).toThrow(MyAwesomeError)
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });
});
