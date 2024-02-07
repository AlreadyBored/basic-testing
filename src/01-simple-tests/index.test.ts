// Uncomment the code below and write your tests
import { Action, simpleCalculator } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 4, action: Action.Add })).toBe(6);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 4, action: Action.Subtract })).toBe(-2);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 4, action: Action.Multiply })).toBe(8);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 4, action: Action.Divide })).toBeCloseTo(
      0.5,
    );
  });

  test('should exponentiate two numbers', () => {
    expect(
      simpleCalculator({ a: 2, b: 4, action: Action.Exponentiate }),
    ).toBeCloseTo(16);
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 2, b: 4, action: 'add' })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: 2, b: '4', action: 'add' })).toBeNull();
  });
});
