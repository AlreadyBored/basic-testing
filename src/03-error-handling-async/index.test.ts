import {
  resolveValue,
  throwError,
  throwCustomError,
  rejectCustomError,
  MyAwesomeError,
} from './index';

describe('resolveValue', () => {
  it('should return the same value passed as argument', async () => {
    const value = 'test';
    const result = await resolveValue(value);
    expect(result).toBe(value);
  });
});

describe('throwError', () => {
  it('should throw an error with the provided message', () => {
    const msg = 'Test error';
    expect(() => throwError(msg)).toThrow(new Error(msg));
  });

  it('should throw an error with default message if no message is provided', () => {
    expect(() => throwError()).toThrow(new Error('Oops!'));
  });
});

describe('throwCustomError', () => {
  it('should throw a MyAwesomeError', () => {
    expect(() => throwCustomError()).toThrow(new MyAwesomeError());
  });
});

describe('rejectCustomError', () => {
  it('should reject with a MyAwesomeError', async () => {
    await expect(rejectCustomError()).rejects.toThrow(new MyAwesomeError());
  });
});
