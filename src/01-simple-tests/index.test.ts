import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const sum = simpleCalculator({ a: 1, b: 2, action: Action.Add });
    expect(sum).toEqual(3);
  });

  test('should subtract two numbers', () => {
    const subtract = simpleCalculator({ a: 5, b: 2, action: Action.Subtract });
    expect(subtract).toEqual(3);
  });

  test('should multiply two numbers', () => {
    const multiply = simpleCalculator({ a: 5, b: 3, action: Action.Multiply });
    expect(multiply).toEqual(15);
  });

  test('should divide two numbers', () => {
    const divide = simpleCalculator({ a: 15, b: 3, action: Action.Divide });
    expect(divide).toEqual(5);
  });

  test('should exponentiate two numbers', () => {
    const exponentiate = simpleCalculator({
      a: 2,
      b: 3,
      action: Action.Exponentiate,
    });
    expect(exponentiate).toEqual(8);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a: 15, b: 3, action: 'invalidAction' });
    expect(result).toEqual(null);
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({ a: 10, b: '3', action: Action.Divide });
    expect(result).toEqual(null);
  });
});