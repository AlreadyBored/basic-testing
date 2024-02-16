import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    expect(await resolveValue('qqq')).toBe('qqq');
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const err = () => throwError('err');
    expect(err).toThrow('err');
  });

  test('should throw error with default message if message is not provided', () => {
    const err = () => throwError();
    expect(err).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    const err = () => throwCustomError();
    expect(err).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    const err = () => rejectCustomError();
    expect(err).rejects.toThrow(MyAwesomeError);
  });
});
