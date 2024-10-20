// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const rawInput = { a: 10, b: 5, action: Action.Add };
    const expected = 15;
    expect(simpleCalculator(rawInput)).toBe(expected);
  });

  test('should subtract two numbers', () => {
    const rawInput = { a: 10, b: 5, action: Action.Subtract };
    const expected = 5;
    expect(simpleCalculator(rawInput)).toBe(expected);
  });

  test('should multiply two numbers', () => {
    const rawInput = { a: 10, b: 5, action: Action.Multiply };
    const expected = 50;
    expect(simpleCalculator(rawInput)).toBe(expected);
  });

  test('should divide two numbers', () => {
    const rawInput = { a: 10, b: 5, action: Action.Divide };
    const expected = 2;
    expect(simpleCalculator(rawInput)).toBe(expected);
  });

  test('should exponentiate two numbers', () => {
    const rawInput = { a: 2, b: 8, action: Action.Exponentiate };
    const expected = 256;
    expect(simpleCalculator(rawInput)).toBe(expected);
  });

  test('should return null for invalid action', () => {
    const rawInput = { a: 2, b: 8, action: 'unknown' };
    const expected = null;
    expect(simpleCalculator(rawInput)).toBe(expected);
  });

  test('should return null for invalid arguments', () => {
    const rawInput = { a: '2', b: 'word', action: Action.Add };
    const expected = null;
    expect(simpleCalculator(rawInput)).toBe(expected);
  });
});
