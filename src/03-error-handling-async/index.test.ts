// Uncomment the code below and write your tests
 import { throwError, throwCustomError, resolveValue, MyAwesomeError, rejectCustomError } from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    // Write your test here
    const data = await resolveValue(4);
    expect(data).toBe(4);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    // Write your test here
    expect.assertions(2);
    try {
       throwError("error");
    } catch (e) {
      expect(e).toMatch('error');
    }
  });

  test('should throw error with default message if message is not provided', () => {
    // Write your test here
    try {
      throwError();
   } catch (e) {
     expect(e).toMatch('Oops!');
   }
  });
});


describe('throwCustomError', () => {
  test('should throw custom error', () => {
    // Write your test here
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    // Write your test here
  });
});
