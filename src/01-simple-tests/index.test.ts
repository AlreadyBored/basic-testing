import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const input = {
      a: 2,
      b: 4,
      action: Action.Add,
    };
    const result = simpleCalculator(input);
    expect(result).toEqual(6);
  });

  test('should subtract two numbers', () => {
    const input = {
      a: 2,
      b: 4,
      action: Action.Subtract,
    };
    const result = simpleCalculator(input);
    expect(result).toEqual(-2);
  });

  test('should multiply two numbers', () => {
    const input = {
      a: 2,
      b: 4,
      action: Action.Multiply,
    };
    const result = simpleCalculator(input);
    expect(result).toEqual(8);
  });

  test('should divide two numbers', () => {
    const input = {
      a: 4,
      b: 2,
      action: Action.Divide,
    };
    const result = simpleCalculator(input);
    expect(result).toEqual(2);
  });

  test('should exponentiate two numbers', () => {
    const input = {
      a: 4,
      b: 2,
      action: Action.Exponentiate,
    };
    const result = simpleCalculator(input);
    expect(result).toEqual(16);
  });

  test('should return null for invalid action', () => {
    const input = {
      a: 4,
      b: 2,
      action: 'invalidAction',
    };
    const result = simpleCalculator(input);
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const input = {
      a: 'invalid',
      b: 2,
      action: Action.Add,
    };
    const result = simpleCalculator(input);
    expect(result).toBeNull();
  });
});
