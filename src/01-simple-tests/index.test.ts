// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
      expect(simpleCalculator({a: 2, b: -3, action: Action.Add})).toBe(-1);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({a: 10, b: 15, action: Action.Subtract})).toBe(-5);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({a: -5, b: 2, action: Action.Multiply})).toBe(-10);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({a: 18, b: 3, action: Action.Divide})).toBe(6);
    expect(simpleCalculator({a: 18, b: 0, action: Action.Divide})).toBe(Infinity);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({a: 4, b: 0.5, action: Action.Exponentiate})).toBe(2);
    expect(simpleCalculator({a: 4, b: 0, action: Action.Exponentiate})).toBe(1);
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({a: 4, b: 3, action: '='})).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({a: 4, b: true, action: '+'})).toBeNull();
    expect(simpleCalculator({a: '4', b: {b: 4}, action: '+'})).toBeNull();
  });
});
