import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const res = simpleCalculator({ a: 2, b: 3, action: Action.Add });
    expect(res).toBe(5);
  });

  test('should subtract two numbers', () => {
    const res = simpleCalculator({ a: 5, b: 3, action: Action.Subtract });
    expect(res).toBe(2);
  });

  test('should multiply two numbers', () => {
    const res = simpleCalculator({ a: 3, b: 2, action: Action.Multiply });
    expect(res).toBe(6);
  });

  test('should divide two numbers', () => {
    const res = simpleCalculator({ a: 4, b: 2, action: Action.Divide });
    expect(res).toBe(2);
  });

  test('should exponentiate two numbers', () => {
    const res = simpleCalculator({ a: 3, b: 2, action: Action.Exponentiate });
    expect(res).toBe(9);
  });

  test('should return null for invalid action', () => {
    const res = simpleCalculator({ a: 3, b: 2, action: '**' });
    expect(res).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const res = simpleCalculator({ a: 3, b: 'hello', action: '-' });
    expect(res).toBeNull();
  });
});
