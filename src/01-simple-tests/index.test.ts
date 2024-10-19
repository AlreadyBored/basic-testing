// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a: 1, b: 1, action: Action.Add });
    expect(result).toBe(2);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a: 5, b: 3, action: Action.Subtract });
    expect(result).toBe(2);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 4, b: 3, action: Action.Multiply });
    expect(result).toBe(12);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 6, b: 3, action: Action.Divide });
    expect(result).toBe(2);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      a: 2,
      b: 3,
      action: Action.Exponentiate,
    });
    expect(result).toBe(8);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a: 2, b: 3, action: 'invalid' });
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result1 = simpleCalculator({
      a: 'not a number',
      b: 3,
      action: Action.Add,
    });
    const result2 = simpleCalculator({
      a: 2,
      b: 'not a number',
      action: Action.Add,
    });
    const result3 = simpleCalculator({ a: 2, b: 3, action: null });

    expect(result1).toBeNull();
    expect(result2).toBeNull();
    expect(result3).toBeNull();
  });
});
