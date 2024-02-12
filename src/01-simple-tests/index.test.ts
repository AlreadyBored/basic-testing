// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result1 = simpleCalculator({ a: 1, b: 3, action: Action.Add });
    const result2 = simpleCalculator({ a: 11, b: -10, action: Action.Add });
    const result3 = simpleCalculator({ a: 0, b: 0, action: Action.Add });

    expect(result1).toBe(4);
    expect(result2).toBe(1);
    expect(result3).toBe(0);
  });

  test('should subtract two numbers', () => {
    const result1 = simpleCalculator({ a: 1, b: 3, action: Action.Subtract });
    const result2 = simpleCalculator({
      a: 11,
      b: -10,
      action: Action.Subtract,
    });
    const result3 = simpleCalculator({ a: -5, b: -1, action: Action.Subtract });

    expect(result1).toBe(-2);
    expect(result2).toBe(21);
    expect(result3).toBe(-4);
  });

  test('should multiply two numbers', () => {
    const result1 = simpleCalculator({ a: 1, b: 3, action: Action.Multiply });
    const result2 = simpleCalculator({
      a: 11,
      b: -10,
      action: Action.Multiply,
    });
    const result3 = simpleCalculator({ a: 0, b: 0, action: Action.Multiply });

    expect(result1).toBe(3);
    expect(result2).toBe(-110);
    expect(result3).toBe(0);
  });

  test('should divide two numbers', () => {
    const result1 = simpleCalculator({ a: 4, b: 2, action: Action.Divide });
    const result2 = simpleCalculator({ a: 27, b: -9, action: Action.Divide });
    const result3 = simpleCalculator({ a: 0, b: 0, action: Action.Divide });

    expect(result1).toBe(2);
    expect(result2).toBe(-3);
    expect(result3).toBeNaN();
  });

  test('should exponentiate two numbers', () => {
    const result1 = simpleCalculator({
      a: 1,
      b: 3,
      action: Action.Exponentiate,
    });
    const result2 = simpleCalculator({
      a: 11,
      b: 2,
      action: Action.Exponentiate,
    });
    const result3 = simpleCalculator({
      a: 154,
      b: 0,
      action: Action.Exponentiate,
    });

    expect(result1).toBe(1);
    expect(result2).toBe(121);
    expect(result3).toBe(1);
  });

  test('should return null for invalid action', () => {
    const action = 'unknown';

    const result1 = simpleCalculator({ a: 1, b: 3, action: action });
    const result2 = simpleCalculator({ a: 11, b: -10, action: action });
    const result3 = simpleCalculator({ a: 0, b: 0, action: action });

    expect(result1).toBe(null);
    expect(result2).toBe(null);
    expect(result3).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    const result1 = simpleCalculator({ a: null, b: 3, action: Action.Add });
    const result2 = simpleCalculator({
      a: undefined,
      b: -10,
      action: Action.Multiply,
    });
    const result3 = simpleCalculator({
      a: 0,
      b: 'test',
      action: Action.Divide,
    });

    expect(result1).toBe(null);
    expect(result2).toBe(null);
    expect(result3).toBe(null);
  });
});
