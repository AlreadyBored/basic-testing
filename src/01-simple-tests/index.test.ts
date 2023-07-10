import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result1 = simpleCalculator({ a: 2, b: 3, action: Action.Add });
    const result2 = simpleCalculator({ a: 4, b: -6, action: Action.Add });
    expect(result1).toBe(5);
    expect(result2).toBe(-2);
  });

  test('should subtract two numbers', () => {
    const result1 = simpleCalculator({ a: 5, b: 2, action: Action.Subtract });
    const result2 = simpleCalculator({ a: -5, b: -9, action: Action.Subtract });
    expect(result1).toBe(3);
    expect(result2).toBe(4);
  });

  test('should multiply two numbers', () => {
    const result1 = simpleCalculator({ a: 4, b: 3, action: Action.Multiply });
    const result2 = simpleCalculator({ a: 4, b: -8, action: Action.Multiply });
    expect(result1).toBe(12);
    expect(result2).toBe(-32);
  });

  test('should divide two numbers', () => {
    const result1 = simpleCalculator({ a: 10, b: 2, action: Action.Divide });
    const result2 = simpleCalculator({ a: 63, b: -7, action: Action.Divide });
    expect(result1).toBe(5);
    expect(result2).toBe(-9);
  });

  test('should exponentiate two numbers', () => {
    const result1 = simpleCalculator({
      a: 2,
      b: 3,
      action: Action.Exponentiate,
    });
    const result2 = simpleCalculator({
      a: 2,
      b: 4,
      action: Action.Exponentiate,
    });
    expect(result1).toBe(8);
    expect(result2).toBe(16);
  });

  test('should return null for invalid action', () => {
    const result1 = simpleCalculator({ a: 2, b: 3, action: 'InvalidAction' }); // Invalid action
    const result2 = simpleCalculator({ a: 2, b: 3, action: 444 }); // Invalid action
    expect(result1).toBeNull();
    expect(result2).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result1 = simpleCalculator({ a: '2', b: 3, action: Action.Add }); // Invalid arguments
    const result2 = simpleCalculator({
      a: 24,
      b: 'six', // Invalid arguments
      action: Action.Divide,
    });
    expect(result1).toBeNull();
    expect(result2).toBeNull();
  });
});
