// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Add })).toBe(3);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 5, b: 3, action: Action.Subtract })).toBe(2);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 4, b: 6, action: Action.Multiply })).toBe(24);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 72, b: 8, action: Action.Divide })).toBe(9);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 5, action: Action.Exponentiate })).toBe(
      32,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 2, b: 5, action: 'string' })).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: 'string', b: {}, action: Action.Add })).toBe(
      null,
    );
  });
});
