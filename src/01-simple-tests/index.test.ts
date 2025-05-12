// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    // Write your test here
    const result = simpleCalculator({ a: 2, b: 7, action: Action.Add });
    expect(result).toBe(9);
  });

  test('should subtract two numbers', () => {
    // Write your test here
    const result = simpleCalculator({ a: 18, b: 12, action: Action.Subtract });
    expect(result).toBe(6);
  });

  test('should multiply two numbers', () => {
    // Write your test here
    const result = simpleCalculator({ a: 3, b: 8, action: Action.Multiply });
    expect(result).toBe(24);
  });

  test('should divide two numbers', () => {
    // Write your test here
    const result = simpleCalculator({ a: 12, b: 3, action: Action.Divide });
    expect(result).toBe(4);
  });

  test('should exponentiate two numbers', () => {
    // Write your test here
    const result = simpleCalculator({
      a: 2,
      b: 3,
      action: Action.Exponentiate,
    });
    expect(result).toBe(8);
  });

  test('should return null for invalid action', () => {
    // Write your test here
    const result = simpleCalculator({ a: 1, b: 2, action: '%' });
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    // Write your test here
    const result = simpleCalculator({
      a: '1',
      b: 2,
      action: Action.Add,
    });
    expect(result).toBeNull();
  });
});
