// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 3, action: Action.Add })).toBe(5);
    expect(simpleCalculator({ a: -2, b: 2, action: Action.Add })).toBe(0);
    expect(simpleCalculator({ a: 1.2, b: 3.1, action: Action.Add })).toBe(4.3);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 3, action: Action.Subtract })).toBe(-1);
    expect(simpleCalculator({ a: 10, b: 10, action: Action.Subtract })).toBe(0);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 3, action: Action.Multiply })).toBe(6);
    expect(simpleCalculator({ a: -2, b: -3, action: Action.Multiply })).toBe(6);
    expect(simpleCalculator({ a: 100, b: 0, action: Action.Multiply })).toBe(0);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 4, b: 2, action: Action.Divide })).toBe(2);
    expect(simpleCalculator({ a: -10, b: 5, action: Action.Divide })).toBe(-2);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 3, action: Action.Exponentiate })).toBe(
      1,
    );
    expect(simpleCalculator({ a: 2, b: 2, action: Action.Exponentiate })).toBe(
      4,
    );
    expect(simpleCalculator({ a: 0, b: 10, action: Action.Exponentiate })).toBe(
      0,
    );
    expect(simpleCalculator({ a: 3, b: 3, action: Action.Exponentiate })).toBe(
      27,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 2, b: 2, action: 0 })).toBe(null);
    expect(simpleCalculator({ a: 1, b: 1, action: 'no action' })).toBe(null);
    expect(simpleCalculator({ a: 5, b: 2, action: null })).toBe(null);
    expect(simpleCalculator({ a: 5, b: 2, action: [] })).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: null, b: null, action: Action.Divide })).toBe(
      null,
    );
    expect(simpleCalculator({ a: 1, b: [], action: Action.Multiply })).toBe(
      null,
    );
  });
});
