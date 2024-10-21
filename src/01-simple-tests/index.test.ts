import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 3, action: Action.Add })).toBe(5);
    expect(simpleCalculator({ a: 2, b: -3, action: Action.Add })).toBe(-1);
    expect(simpleCalculator({ a: -2, b: 3, action: Action.Add })).toBe(1);
    expect(simpleCalculator({ a: -2, b: -3, action: Action.Add })).toBe(-5);
    expect(simpleCalculator({ a: 0, b: 3, action: Action.Add })).toBe(3);
    expect(simpleCalculator({ a: 3, b: 0, action: Action.Add })).toBe(3);
    expect(simpleCalculator({ a: 0, b: 0, action: Action.Add })).toBe(0);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 5, b: 2, action: Action.Subtract })).toBe(3);
    expect(simpleCalculator({ a: -5, b: 2, action: Action.Subtract })).toBe(-7);
    expect(simpleCalculator({ a: -5, b: -2, action: Action.Subtract })).toBe(
      -3,
    );
    expect(simpleCalculator({ a: 5, b: -2, action: Action.Subtract })).toBe(7);
    expect(simpleCalculator({ a: 0, b: 2, action: Action.Subtract })).toBe(-2);
    expect(simpleCalculator({ a: 2, b: 0, action: Action.Subtract })).toBe(2);
    expect(simpleCalculator({ a: 0, b: 0, action: Action.Subtract })).toBe(0);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 5, b: 2, action: Action.Multiply })).toBe(10);
    expect(simpleCalculator({ a: -5, b: 2, action: Action.Multiply })).toBe(
      -10,
    );
    expect(simpleCalculator({ a: -5, b: -2, action: Action.Multiply })).toBe(
      10,
    );
    expect(simpleCalculator({ a: 5, b: -2, action: Action.Multiply })).toBe(
      -10,
    );
    expect(simpleCalculator({ a: 2, b: 0, action: Action.Multiply })).toBe(0);
    expect(simpleCalculator({ a: 0, b: 2, action: Action.Multiply })).toBe(0);
    expect(simpleCalculator({ a: 0, b: 0, action: Action.Multiply })).toBe(0);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 6, b: 2, action: Action.Divide })).toBe(3);
    expect(simpleCalculator({ a: -6, b: 2, action: Action.Divide })).toBe(-3);
    expect(simpleCalculator({ a: -6, b: -2, action: Action.Divide })).toBe(3);
    expect(simpleCalculator({ a: 6, b: -2, action: Action.Divide })).toBe(-3);
    expect(simpleCalculator({ a: 2, b: 0, action: Action.Divide })).toBe(
      Infinity,
    );
    expect(simpleCalculator({ a: 0, b: 2, action: Action.Divide })).toBe(0);
    expect(simpleCalculator({ a: 0, b: 0, action: Action.Divide })).toBe(NaN);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 6, b: 2, action: Action.Exponentiate })).toBe(
      36,
    );
    expect(simpleCalculator({ a: -6, b: 2, action: Action.Exponentiate })).toBe(
      36,
    );
    expect(
      simpleCalculator({ a: -10, b: -2, action: Action.Exponentiate }),
    ).toBe(0.01);
    expect(
      simpleCalculator({ a: 10, b: -2, action: Action.Exponentiate }),
    ).toBe(0.01);
    expect(simpleCalculator({ a: 2, b: 0, action: Action.Exponentiate })).toBe(
      1,
    );
    expect(simpleCalculator({ a: 0, b: 2, action: Action.Exponentiate })).toBe(
      0,
    );
    expect(simpleCalculator({ a: 0, b: 0, action: Action.Exponentiate })).toBe(
      1,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 0, b: 0, action: undefined })).toBeNull();
    expect(simpleCalculator({ a: 0, b: 0, action: null })).toBeNull();
    expect(simpleCalculator({ a: 0, b: 0, action: '!' })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: null, b: 3, action: Action.Add })).toBeNull();
    expect(
      simpleCalculator({ a: 2, b: undefined, action: Action.Add }),
    ).toBeNull();
    expect(simpleCalculator({ a: -2, b: '3', action: Action.Add })).toBeNull();
  });
});
