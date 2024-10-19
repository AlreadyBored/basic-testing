import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a: 5, b: 3, action: Action.Add });
    expect(result).toBe(8);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a: 10, b: 4, action: Action.Subtract });
    expect(result).toBe(6);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 7, b: 6, action: Action.Multiply });
    expect(result).toBe(42);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 9, b: 3, action: Action.Divide });
    expect(result).toBe(3);
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
    const result = simpleCalculator({ a: 4, b: 2, action: '%' });
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({ a: '4', b: 2, action: Action.Add });
    expect(result).toBeNull();
  });

  test('should return null for invalid action', () => {
    const invalidActionInput = {
      a: 2,
      b: 3,
      action: '%',
    };
    const result = simpleCalculator(invalidActionInput);
    expect(result).toBeNull();
  });
});
