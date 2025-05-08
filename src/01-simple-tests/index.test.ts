import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 5, b: 3, action: Action.Add })).toBe(8);
    expect(simpleCalculator({ a: 0, b: 0, action: Action.Add })).toBe(0);
    expect(simpleCalculator({ a: -2, b: 7, action: Action.Add })).toBe(5);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 5, b: 3, action: Action.Subtract })).toBe(2);
    expect(simpleCalculator({ a: 10, b: 15, action: Action.Subtract })).toBe(
      -5,
    );
    expect(simpleCalculator({ a: -2, b: -3, action: Action.Subtract })).toBe(1);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 5, b: 3, action: Action.Multiply })).toBe(15);
    expect(simpleCalculator({ a: -4, b: 2, action: Action.Multiply })).toBe(-8);
    expect(simpleCalculator({ a: 0, b: 100, action: Action.Multiply })).toBe(0);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 6, b: 3, action: Action.Divide })).toBe(2);
    expect(simpleCalculator({ a: 10, b: 2, action: Action.Divide })).toBe(5);
    expect(simpleCalculator({ a: -15, b: 5, action: Action.Divide })).toBe(-3);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 3, action: Action.Exponentiate })).toBe(
      8,
    );
    expect(simpleCalculator({ a: 3, b: 2, action: Action.Exponentiate })).toBe(
      9,
    );
    expect(simpleCalculator({ a: -2, b: 3, action: Action.Exponentiate })).toBe(
      -8,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 5, b: 3, action: '%' })).toBe(null);
    expect(simpleCalculator({ a: 2, b: 4, action: '' })).toBe(null);
    expect(simpleCalculator({ a: 1, b: 1, action: 'invalid' })).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: '5', b: 3, action: Action.Add })).toBe(null);
    expect(simpleCalculator({ a: 5, b: null, action: Action.Subtract })).toBe(
      null,
    );
    expect(
      simpleCalculator({ a: undefined, b: 2, action: Action.Multiply }),
    ).toBe(null);
  });
});
