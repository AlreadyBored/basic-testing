import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const res = simpleCalculator({ a: 5, b: 5, action: Action.Add });
    expect(res).toBe(10);
  });

  test('should subtract two numbers', () => {
    const res = simpleCalculator({ a: 5, b: 5, action: Action.Subtract });
    expect(res).toBe(0);
  });

  test('should multiply two numbers', () => {
    const res = simpleCalculator({ a: 5, b: 5, action: Action.Multiply });
    expect(res).toBe(25);
  });

  test('should divide two numbers', () => {
    const res = simpleCalculator({ a: 5, b: 5, action: Action.Divide });
    expect(res).toBe(1);
  });

  test('should exponentiate two numbers', () => {
    const res = simpleCalculator({ a: 5, b: 5, action: Action.Exponentiate });
    expect(res).toBe(3125);
  });

  test('should return null for invalid action', () => {
    const res = simpleCalculator({ a: 5, b: 5, action: 'some invalid action' });
    expect(res).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({ a: '5', b: '', action: Action.Add });
    expect(result).toBeNull();
  });
});
