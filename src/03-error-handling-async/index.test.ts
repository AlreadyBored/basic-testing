// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const spy = jest.fn();
    await resolveValue('test').then((value) => spy(value));
    expect(spy).toHaveBeenCalledWith('test');
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(() => throwError('test')).toThrowError('test');
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrowError('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError).toThrowError(
      'This is my awesome custom error!',
    );
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    try {
      console.log('try');
      await rejectCustomError();
    } catch (error) {
      console.log('error', error);
      expect(typeof error).toMatch('This is my awesome custom error!');
    }
  });
});
