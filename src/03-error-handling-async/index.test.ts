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
    // Write your test here
    const resultValue = await resolveValue('value');
    const resultNumber = await resolveValue(224);
    const resultArray = await resolveValue([1, 2, 3, 4]);
    const resultPromies = await resolveValue(Promise<void>);
    expect(resultValue).toEqual('value');
    expect(resultNumber).toEqual(224);
    expect(resultArray).toEqual([1, 2, 3, 4]);
    expect(resultPromies).toEqual(Promise<void>);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    // Write your test here
    expect(() => {throwError('random')}).toThrow('random');
  });

  test('should throw error with default message if message is not provided', () => {
    // Write your test here
    expect(throwError).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    // Write your test here
    expect(throwCustomError).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    // Write your test here
    await expect(rejectCustomError).rejects.toThrow(MyAwesomeError);
  });
});
