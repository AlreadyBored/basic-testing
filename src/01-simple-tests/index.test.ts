import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const rawInput = { a: 3, b: 5, action: Action.Add };
    const result = simpleCalculator(rawInput);
    expect(result).toBe(8);
  });

  test('should subtract two numbers', () => {
    const rawInput = { a: 10, b: 4, action: Action.Subtract };
    const result = simpleCalculator(rawInput);
    expect(result).toBe(6);
  });

  test('should multiply two numbers', () => {
    const rawInput = { a: 7, b: 6, action: Action.Multiply };
    const result = simpleCalculator(rawInput);
    expect(result).toBe(42);
  });

  test('should divide two numbers', () => {
    const rawInput = { a: 20, b: 4, action: Action.Divide };
    const result = simpleCalculator(rawInput);
    expect(result).toBe(5);
  });

  test('should exponentiate two numbers', () => {
    const rawInput = { a: 2, b: 3, action: Action.Exponentiate };
    const result = simpleCalculator(rawInput);
    expect(result).toBe(8);
  });

  test('should return null for invalid action', () => {
    const rawInput = { a: 2, b: 3, action: '%' };
    const result = simpleCalculator(rawInput);
    expect(result).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    const rawInput = { a: '2', b: '3', action: Action.Add };
    const result = simpleCalculator(rawInput);
    expect(result).toBe(null);
  });
});
