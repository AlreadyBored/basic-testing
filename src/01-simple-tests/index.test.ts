// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const input = {
      a: 3,
      b: 4,
      action: Action.Add,
    };

    const result = simpleCalculator(input);
    expect(result).toBe(7);
  });

  test('should subtract two numbers', () => {
    const input = {
      a: 3,
      b: 4,
      action: Action.Subtract,
    };

    const result = simpleCalculator(input);
    expect(result).toBe(-1);
  });

  test('should multiply two numbers', () => {
    const input = {
      a: 3,
      b: 4,
      action: Action.Multiply,
    };

    const result = simpleCalculator(input);
    expect(result).toBe(12);
  });

  test('should divide two numbers', () => {
    const input = {
      a: 15,
      b: 5,
      action: Action.Divide,
    };

    const result = simpleCalculator(input);
    expect(result).toBe(3);
  });

  test('should exponentiate two numbers', () => {
    const input = {
      a: 3,
      b: 4,
      action: Action.Exponentiate,
    };

    const result = simpleCalculator(input);
    expect(result).toBe(81);
  });

  test('should return null for invalid action', () => {
    const input = {
      a: 3,
      b: 4,
      action: '&',
    };

    const result = simpleCalculator(input);
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const input = {
      a: '3',
      b: '4',
      action: Action.Add,
    };

    const result = simpleCalculator(input);
    expect(result).toBeNull();
  });
});
