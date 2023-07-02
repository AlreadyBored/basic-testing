import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    expect(await resolveValue('Delta miss')).toBe('Delta miss');
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(throwError('Delta')).rejects.toThrow('Delta');
  });

  test('should throw error with default message if message is not provided', () => {
    expect(throwError()).rejects.toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(throwCustomError()).rejects.toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    expect(await rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });
});
