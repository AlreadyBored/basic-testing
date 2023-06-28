// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const input = {
      a: 5,
      b: 3,
      action: Action.Add,
    };
    const expectedResult = 8;

    const result = simpleCalculator(input);

    expect(result).toBe(expectedResult);
  });

  test('should subtract two numbers', () => {
    const input = {
      a: 5,
      b: 3,
      action: Action.Subtract,
    };
    const expectedResult = 2;

    const result = simpleCalculator(input);

    expect(result).toBe(expectedResult);
  });

  test('should multiply two numbers', () => {
    const input = {
      a: 5,
      b: 3,
      action: Action.Multiply,
    };
    const expectedResult = 15;

    const result = simpleCalculator(input);

    expect(result).toBe(expectedResult);
  });

  test('should divide two numbers', () => {
    const input = {
      a: 15,
      b: 3,
      action: Action.Divide,
    };
    const expectedResult = 5;

    const result = simpleCalculator(input);

    expect(result).toBe(expectedResult);
  });

  test('should exponentiate two numbers', () => {
    const input = {
      a: 5,
      b: 2,
      action: Action.Exponentiate,
    };
    const expectedResult = 25;

    const result = simpleCalculator(input);

    expect(result).toBe(expectedResult);
  });

  test('should return null for invalid action', () => {
    const input = {
      a: 5,
      b: 3,
      action: 'create',
    };

    const result = simpleCalculator(input);

    expect(result).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    const input = {
      a: 'five',
      b: 3,
      action: Action.Add,
    };

    const result = simpleCalculator(input);

    expect(result).toBe(null);
  });
});
