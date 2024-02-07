// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    // Write your test here
    const res = simpleCalculator({ a: 1, b: 2, action: Action.Add });
    expect(res).toBe(3);
  });

  test('should subtract two numbers', () => {
    // Write your test here
    const res = simpleCalculator({ a: 5, b: 3, action: Action.Subtract });
    expect(res).toBe(2);
  });

  test('should multiply two numbers', () => {
    // Write your test here
    const res = simpleCalculator({ a: 5, b: 2, action: Action.Multiply });
    expect(res).toBe(10);
  });

  test('should divide two numbers', () => {
    // Write your test here
    const res = simpleCalculator({ a: 15, b: 3, action: Action.Divide });
    expect(res).toBe(5);
  });

  test('should exponentiate two numbers', () => {
    // Write your test here
    const res = simpleCalculator({ a: 2, b: 3, action: Action.Exponentiate });
    expect(res).toBe(8);
  });

  test('should return null for invalid action', () => {
    // Write your test here
    const res = simpleCalculator({ a: 2, b: 3, action: '%' });
    expect(res).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    // Write your test here
    const res = simpleCalculator({ a: 'n', b: 3, action: Action.Subtract });
    expect(res).toBeNull();
  });
});
