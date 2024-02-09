// Uncomment the code below and write your tests
import { throwError, throwCustomError, resolveValue, MyAwesomeError, rejectCustomError } from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    await expect(resolveValue({name: 'test'})).resolves.toEqual({name: 'test'});
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(() => throwError('There is an error inside :(')).toThrow('There is an error inside :(');
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    try {
      throwCustomError(); 
    } catch (error) {
        expect(error).toBeInstanceOf(MyAwesomeError);
        expect((error as Error).message).toBe('This is my awesome custom error!');
    }
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    try {
      await rejectCustomError(); 
    } catch (error) {
        expect(error).toBeInstanceOf(MyAwesomeError);
        expect((error as Error).message).toBe('This is my awesome custom error!');
    } 
  });
});
