import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a: 2, b: 2, action: Action.Add });
    expect(result).toBe(4);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a: 4, b: 2, action: Action.Subtract });
    expect(result).toBe(2);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 2, b: 5, action: Action.Multiply });
    expect(result).toBe(10);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 10, b: 2, action: Action.Divide });
    expect(result).toBe(5);
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
    const invalidAction = '***';

    const result = simpleCalculator({ a: 1, b: 1, action: invalidAction });
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({ a: true, b: 1, action: Action.Add });
    expect(result).toBeNull();
  });
});