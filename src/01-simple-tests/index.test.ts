
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const res = simpleCalculator({ a: 1, b: 7, action: Action.Add });
    expect(res).toBe(8);
  });

  test('should subtract two numbers', () => {
    const res = simpleCalculator({ a: 77, b: 7, action: Action.Subtract });
    expect(res).toBe(70);
  });

  test('should multiply two numbers', () => {
    const res = simpleCalculator({ a: 7, b: 7, action: Action.Multiply });
    expect(res).toBe(49);
  });

  test('should divide two numbers', () => {
    const res = simpleCalculator({ a: 7, b: 7, action: Action.Divide });
    expect(res).toBe(1);
  });

  test('should exponentiate two numbers', () => {
    const res = simpleCalculator({ a: 2, b: 7, action: Action.Exponentiate });
    expect(res).toBe(128);
  });

  test('should return null for invalid action', () => {
    const res = simpleCalculator({ a: 7, b: '7', action: '%' });
    expect(res).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const res = simpleCalculator({ a: 7, b: '7', action: Action.Add });
    expect(res).toBeNull();
  });
});
