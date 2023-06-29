import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  let a: number, b: number;

  beforeEach(() => {
    a = Math.random();
    b = Math.random();
  });

  test('should add two numbers', () => {
    const result = simpleCalculator({ a, b, action: Action.Add });
    expect(result).toBe(a + b);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a, b, action: Action.Subtract })).toBe(a - b);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a, b, action: Action.Multiply })).toBe(a * b);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a, b, action: Action.Divide })).toBe(a / b);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a, b, action: Action.Exponentiate })).toBe(
      a ** b,
    );
  });

  test('should return null for invalid action', () => {
    const res = simpleCalculator({ a, b, action: 'nonexist' });
    expect(res).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const res = simpleCalculator({ a: 'as', b: 0, action: Action.Add });
    expect(res).toBeNull();
  });
});
