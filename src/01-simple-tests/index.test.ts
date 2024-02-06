import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a: 20, b: 22, action: Action.Add });
    expect(result).toBe(42);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a: 65, b: 23, action: Action.Subtract });
    expect(result).toBe(42);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 6, b: 7, action: Action.Multiply });
    expect(result).toBe(42);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 126, b: 3, action: Action.Divide });
    expect(result).toBe(42);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      a: 2,
      b: 8,
      action: Action.Exponentiate,
    });
    expect(result).toBe(256);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a: 42, b: 3, action: 'podelit' });
    expect(result).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({ a: 42, b: '3', action: Action.Divide });
    expect(result).toBe(null);
  });
});
