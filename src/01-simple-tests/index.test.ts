// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a: 1, b: 2, action: Action.Add });

    expect(result).toBe(3);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a: 5, b: 2, action: Action.Subtract });

    expect(result).toBe(3);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 5, b: 10, action: Action.Multiply });

    expect(result).toBe(50);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 10, b: 5, action: Action.Divide });

    expect(result).toBe(2);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      a: 3,
      b: 3,
      action: Action.Exponentiate,
    });

    expect(result).toBe(27);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a: 10, b: 5, action: 'invalid-action' });

    expect(result).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({
      a: 'invalid-input',
      b: 5,
      action: Action.Divide,
    });

    expect(result).toBe(null);
  });
});
