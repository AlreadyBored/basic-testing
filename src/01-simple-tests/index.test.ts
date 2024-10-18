import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result1 = simpleCalculator({ a: 1, b: 2, action: Action.Add });
    expect(result1).toBe(3);

    const result2 = simpleCalculator({ a: -2, b: 2, action: Action.Add });
    expect(result2).toBe(0);

    const result3 = simpleCalculator({ a: 0, b: 0, action: Action.Add });
    expect(result3).toBe(0);

    const result4 = simpleCalculator({ a: -3, b: -4, action: Action.Add });
    expect(result4).toBe(-7);
  });

  test('should subtract two numbers', () => {
    const result1 = simpleCalculator({ a: 5, b: 1, action: Action.Subtract });
    expect(result1).toBe(4);

    const result2 = simpleCalculator({ a: -5, b: -5, action: Action.Subtract });
    expect(result2).toBe(0);

    const result3 = simpleCalculator({ a: 0, b: 0, action: Action.Subtract });
    expect(result3).toBe(0);

    const result4 = simpleCalculator({ a: 5, b: -5, action: Action.Subtract });
    expect(result4).toBe(10);
  });

  test('should multiply two numbers', () => {
    const result1 = simpleCalculator({ a: 5, b: 5, action: Action.Multiply });
    expect(result1).toBe(25);

    const result2 = simpleCalculator({ a: -5, b: -5, action: Action.Multiply });
    expect(result2).toBe(25);

    const result3 = simpleCalculator({ a: 0, b: 0, action: Action.Multiply });
    expect(result3).toBe(0);

    const result4 = simpleCalculator({ a: 5, b: -5, action: Action.Multiply });
    expect(result4).toBe(-25);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 10, b: 2, action: Action.Divide });
    expect(result).toBe(5);

    const result2 = simpleCalculator({ a: -10, b: 2, action: Action.Divide });
    expect(result2).toBe(-5);

    const result3 = simpleCalculator({ a: 10, b: 0, action: Action.Divide });
    expect(result3).toBe(Infinity);

    const result4 = simpleCalculator({ a: 10, b: -2, action: Action.Divide });
    expect(result4).toBe(-5);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      a: 5,
      b: 3,
      action: Action.Exponentiate,
    });
    expect(result).toBe(125);

    const result2 = simpleCalculator({
      a: -5,
      b: 3,
      action: Action.Exponentiate,
    });
    expect(result2).toBe(-125);

    const result3 = simpleCalculator({
      a: 5,
      b: -3,
      action: Action.Exponentiate,
    });
    expect(result3).toBe(0.008);

    const result4 = simpleCalculator({
      a: 5,
      b: 0,
      action: Action.Exponentiate,
    });
    expect(result4).toBe(1);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a: 5, b: 2, action: '%' });
    expect(result).toBeNull();

    const result2 = simpleCalculator({ a: 5, b: 2, action: 'invalid' });
    expect(result2).toBeNull();

    const result3 = simpleCalculator({ a: 5, b: 2, action: null });
    expect(result3).toBeNull();

    const result4 = simpleCalculator({ a: 5, b: 2, action: undefined });
    expect(result4).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({ a: '5', b: 3, action: Action.Add });
    expect(result).toBeNull();

    const result2 = simpleCalculator({ a: 5, b: '3', action: Action.Subtract });
    expect(result2).toBeNull();
  });
});
