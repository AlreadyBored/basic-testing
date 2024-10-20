// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    // Write your test here
    const input = { a: 1, b: 2, action: Action.Add };
    const result = simpleCalculator(input);
    expect(result).toBe(3);
  });

  test('should subtract two numbers', () => {
    // Write your test here
    const input = { a: 1, b: 2, action: Action.Subtract };
    const result = simpleCalculator(input);
    expect(result).toBe(-1);
  });

  test('should multiply two numbers', () => {
    // Write your test here
    const input = { a: 1, b: 2, action: Action.Multiply };
    const result = simpleCalculator(input);
    expect(result).toBe(2);
  });

  test('should divide two numbers', () => {
    // Write your test here
    const input = { a: 10, b: 2, action: Action.Divide };
    const result = simpleCalculator(input);
    expect(result).toBe(5);
  });

  test('should exponentiate two numbers', () => {
    // Write your test here
    const input = { a: 10, b: 2, action: Action.Exponentiate };
    const result = simpleCalculator(input);
    expect(result).toBe(100);
  });

  test('should return null for invalid action', () => {
    // Write your test here
    const input = { a: 10, b: 2, action: 'invalid_action' };
    const result = simpleCalculator(input);
    expect(result).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    // Write your test here
    const input = { a: 'abc', b: 2, action: Action.Add };
    const result = simpleCalculator(input);
    expect(result).toBe(null);
  });
});
