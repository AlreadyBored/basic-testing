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
    const value = 'myValue';
    return await expect(resolveValue(value)).resolves.toBe(value);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const errMessage = 'myMessage';
    expect(() => throwError(errMessage)).toThrow(new Error(errMessage));
  });

  test('should throw error with provided message', () => {
    const errMessage = '';
    expect(() => throwError(errMessage)).toThrow(new Error(errMessage));
  });

  //Here I don't know whether I should check if the error have a specific default message
  // or any default message. Let's guessing the default message contains the substring "Oops"
  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow('Oops');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    return expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });
});
