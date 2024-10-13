// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    // Write your test here
    const rawInput = { a: 111, b: 222, action: Action.Add };
    const expected = 333;

    expect(simpleCalculator(rawInput)).toBe(expected);
  });

  test('should subtract two numbers', () => {
    // Write your test here
    const rawInput = { a: 222, b: 20, action: Action.Subtract };
    const expected = 202;

    expect(simpleCalculator(rawInput)).toBe(expected);
  });

  test('should multiply two numbers', () => {
    // Write your test here
    const rawInput = { a: 11, b: 11, action: Action.Multiply };
    const expected = 121;

    expect(simpleCalculator(rawInput)).toBe(expected);
  });

  test('should divide two numbers', () => {
    // Write your test here
    const rawInput = { a: 55, b: 5, action: Action.Divide };
    const expected = 11;

    expect(simpleCalculator(rawInput)).toBe(expected);
  });

  test('should exponentiate two numbers', () => {
    // Write your test here
    const rawInput = { a: 5, b: 3, action: Action.Exponentiate };
    const expected = 125;

    expect(simpleCalculator(rawInput)).toBe(expected);
  });

  test('should return null for invalid action', () => {
    // Write your test here
    const rawInput = { a: 2, b: 8, action: 'invalid' };

    expect(simpleCalculator(rawInput)).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    // Write your test here
    const rawInput = { a: 9, b: 'sdsds', action: Action.Multiply };

    expect(simpleCalculator(rawInput)).toBeNull();
  });
});
