import { throwError, throwCustomError, resolveValue, MyAwesomeError, rejectCustomError } from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const value = 'this is the error';
    const resolve = await resolveValue(value);
    expect(resolve).toBe(value);
  });
});

describe('throwError', () => {
 test('should throw error with provided message', () => {
   expect(() => throwError('I am an error')).toThrowError('I am an error');
 });

 test('should throw error with default message if message is not provided', () => {    
   expect(() => throwError()).toThrowError('Oops!');
 });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrowError(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    expect(() => rejectCustomError()).rejects.toThrowError(MyAwesomeError);
  });
});
