import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a: 33, b: 77, action: Action.Add });
    expect(result).toBe(110);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a: 33, b: 77, action: Action.Subtract });
    expect(result).toBe(-44);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 33, b: 77, action: Action.Multiply });
    expect(result).toBe(2541);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 33, b: 77, action: Action.Divide });
    expect(result).toBeCloseTo(0.42857142857142855);
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
    const result = simpleCalculator({ a: 33, b: 77, action: 'invalid' });
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({
      a: 33,
      b: 'invalid',
      action: Action.Add,
    });
    expect(result).toBeNull();
  });
});
