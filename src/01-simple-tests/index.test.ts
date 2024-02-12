import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a: 2, b: 3, action: Action.Add });
    expect(result).toBe(5);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a: 10, b: 3, action: Action.Subtract });
    expect(result).toBe(7);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 10, b: 3, action: Action.Multiply });
    expect(result).toBe(30);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 12, b: 3, action: Action.Divide });
    expect(result).toBe(4);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      a: 5,
      b: 2,
      action: Action.Exponentiate,
    });
    expect(result).toBe(25);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({
      a: 5,
      b: 5,
      action: 'wrong action',
    });
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({
      a: {},
      b: 'dmsklf',
      action: Action.Add,
    });
    expect(result).toBeNull();
  });
});
