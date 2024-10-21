/* eslint-disable @typescript-eslint/no-unused-vars */
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
    expect(resolveValue(5)).toBe(5);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(throwError('test')).toBe('test');
  });

  test('should throw error with default message if message is not provided', () => {
    expect(new MyAwesomeError()).toBe('This is my awesome custom error!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(throwCustomError()).toBe('This is my awesome custom error!');
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    expect(rejectCustomError()).toBe('This is my awesome custom error!');
  });
});
