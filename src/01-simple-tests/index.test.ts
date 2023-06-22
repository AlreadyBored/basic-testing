// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({
      a: 5,
      b: 7,
      action: Action.Add,
    });
    expect(result).toEqual(12);
  });

  test('should substract two numbers', () => {
    const result = simpleCalculator({
      a: 5,
      b: 7,
      action: Action.Substract,
    });
    expect(result).toEqual(-2);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({
      a: 5,
      b: 7,
      action: Action.Multiply,
    });
    expect(result).toEqual(35);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({
      a: 14,
      b: 7,
      action: Action.Divide,
    });
    expect(result).toEqual(2);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      a: 2,
      b: 3,
      action: Action.Exponentiate,
    });
    expect(result).toEqual(8);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({
      a: 14,
      b: 7,
      action: 'some invalid action',
    });
    expect(result).toEqual(null);
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({
      a: 'invalid arg type',
      b: undefined,
      action: Action.Divide,
    });
    expect(result).toEqual(null);
  });
});
