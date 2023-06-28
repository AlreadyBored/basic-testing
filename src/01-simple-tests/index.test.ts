import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const res = simpleCalculator({ a: 2, b: 2, action: Action.Add });
    expect(res).toBe(4);
  });

  test('should subtract two numbers', () => {
    const res = simpleCalculator({ a: 10, b: 4, action: Action.Subtract });
    expect(res).toBe(6);
  });

  test('should multiply two numbers', () => {
    const res = simpleCalculator({ a: 5, b: 4, action: Action.Multiply });
    expect(res).toBe(20);
  });

  test('should divide two numbers', () => {
    const res = simpleCalculator({ a: 50, b: 5, action: Action.Divide });
    expect(res).toBe(10);
  });

  test('should exponentiate two numbers', () => {
    const res = simpleCalculator({ a: 3, b: 3, action: Action.Exponentiate });
    expect(res).toBe(27);
  });

  test('should return null for invalid action', () => {
    const res = simpleCalculator({ a: 10, b: 4, action: 'notrealaction' });
    expect(res).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const res = simpleCalculator({ a: '10', b: true, action: Action.Add });
    expect(res).toBeNull();
  });
});
