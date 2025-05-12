import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const a = 2;
    const b = 10;
    const sum = simpleCalculator({ a, b, action: Action.Add });
    expect(sum).toBe(a + b);
  }, 30);

  test('should subtract two numbers', () => {
    const a = 10;
    const b = 14;
    const diff = simpleCalculator({ a, b, action: Action.Subtract });
    expect(diff).toBe(a - b);
  });

  test('should multiply two numbers', () => {
    const a = 10;
    const b = 14;
    const mult = simpleCalculator({ a, b, action: Action.Multiply });
    expect(mult).toBe(a * b);
  });

  test('should divide two numbers', () => {
    const a = 22;
    const b = 2;
    const div = simpleCalculator({ a, b, action: Action.Divide });
    expect(div).toBe(a / b);
  });

  test('should exponentiate two numbers', () => {
    const a = 12;
    const b = 2;
    const exp = simpleCalculator({ a, b, action: Action.Exponentiate });
    expect(exp).toBe(a ** b);
  });

  test('should return null for invalid action', () => {
    const res = simpleCalculator({ a: 2, b: 2, action: 'Purify' });
    expect(res).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const invalidA = simpleCalculator({ a: 'hi', b: 2, action: Action.Add });
    const invalidB = simpleCalculator({
      a: 10,
      b: 'invalid',
      action: Action.Subtract,
    });
    const invalidArgs = simpleCalculator({
      a: 'hi',
      b: 'invalid',
      action: 'action',
    });
    expect(invalidA).toBeNull();
    expect(invalidB).toBeNull();
    expect(invalidArgs).toBeNull();
  });
});