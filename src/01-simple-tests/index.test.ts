import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({
      a: 2,
      b: 3,
      action: Action.Add,
    });
    expect(result).toBe(5);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({
      a: 3,
      b: 2,
      action: Action.Subtract
    });
    expect(result).toBe(1);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({
      a: 3,
      b: 2,
      action: Action.Multiply
    });
    expect(result).toBe(6);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({
      a: 6,
      b: 2,
      action: Action.Divide
    });
    expect(result).toBe(3);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      a: 3,
      b: 2,
      action: Action.Exponentiate
    });
    expect(result).toBe(9);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({
      a: 5,
      b: 3,
      action: 'InvalidAction',
    });
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({
      a: 'invalid',
      b: 2,
      action: Action.Exponentiate
    });
    expect(result).toBeNull();
  });
});
