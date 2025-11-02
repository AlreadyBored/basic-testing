import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const total = simpleCalculator({ a: 4, b: 2, action: Action.Add });
    expect(total).toBe(6);
  });

  test('should subtract two numbers', () => {
    const total = simpleCalculator({ a: 4, b: 2, action: Action.Subtract });
    expect(total).toBe(2);
  });

  test('should multiply two numbers', () => {
    const total = simpleCalculator({ a: 4, b: 2, action: Action.Multiply });
    expect(total).toBe(8);
  });

  test('should divide two numbers', () => {
    const total = simpleCalculator({ a: 4, b: 2, action: Action.Divide });
    expect(total).toBe(2);
  });

  test('should exponentiate two numbers', () => {
    const total = simpleCalculator({ a: 4, b: 2, action: Action.Exponentiate });
    expect(total).toBe(16);
  });

  test('should return null for invalid action', () => {
    const total = simpleCalculator({
      a: 4,
      b: 2,
      action: '',
    });
    expect(total).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    const total = simpleCalculator({
      a: '',
      b: 2,
      action: Action.Exponentiate,
    });
    expect(total).toBe(null);
  });
});
