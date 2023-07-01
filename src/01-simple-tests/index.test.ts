import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({
      a: 2,
      b: 3,
      action: Action.Add,
    });
    expect(result).toEqual(5);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({
      a: 2,
      b: 3,
      action: Action.Subtract,
    });
    expect(result).toEqual(-1);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({
      a: 2,
      b: 3,
      action: Action.Multiply,
    });
    expect(result).toEqual(6);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({
      a: 6,
      b: 3,
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
      a: 2,
      b: 3,
      action: 'invalid action',
    });
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({
      a: 2,
      b: '3',
      action: Action.Exponentiate,
    });
    expect(result).toBeNull();
  });
});