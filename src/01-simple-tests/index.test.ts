import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 7, b: 6, action: Action.Add })).toBe(13);
    expect(simpleCalculator({ a: -7, b: 6, action: Action.Add })).toBe(-1);
    expect(simpleCalculator({ a: 2, b: 2, action: Action.Add })).toBe(4);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 7, b: 6, action: Action.Subtract })).toBe(1);
    expect(simpleCalculator({ a: -7, b: 6, action: Action.Subtract })).toBe(
      -13,
    );
    expect(simpleCalculator({ a: 2, b: 2, action: Action.Subtract })).toBe(0);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 7, b: 6, action: Action.Multiply })).toBe(42);
    expect(simpleCalculator({ a: -7, b: 6, action: Action.Multiply })).toBe(
      -42,
    );
    expect(simpleCalculator({ a: 0, b: 2, action: Action.Multiply })).toBe(0);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 15, b: 3, action: Action.Divide })).toBe(5);
    expect(simpleCalculator({ a: -15, b: 3, action: Action.Divide })).toBe(-5);
    expect(simpleCalculator({ a: 0, b: 2, action: Action.Divide })).toBe(0);
    expect(simpleCalculator({ a: 2, b: 0, action: Action.Divide })).toBe(
      Infinity,
    );
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 3, action: Action.Exponentiate })).toBe(
      8,
    );
    expect(simpleCalculator({ a: -2, b: 3, action: Action.Exponentiate })).toBe(
      -8,
    );
    expect(simpleCalculator({ a: 2, b: -3, action: Action.Exponentiate })).toBe(
      0.125,
    );
    expect(simpleCalculator({ a: 0, b: 3, action: Action.Exponentiate })).toBe(
      0,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 7, b: 6, action: '%' })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: '7', b: 6, action: Action.Add })).toBeNull();
    expect(
      simpleCalculator({ a: 7, b: '6', action: Action.Subtract }),
    ).toBeNull();
    expect(
      simpleCalculator({ a: null, b: 6, action: Action.Multiply }),
    ).toBeNull();
  });
});
