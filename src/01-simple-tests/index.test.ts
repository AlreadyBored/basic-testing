import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const params = {
      a: 5,
      b: 10,
      action: Action.Add,
    };

    const result = simpleCalculator(params);

    expect(result).toBe(15);
  });

  test('should subtract two numbers', () => {
    const params = {
      a: 10,
      b: 7,
      action: Action.Subtract,
    };

    const result = simpleCalculator(params);

    expect(result).toBe(3);
  });

  test('should multiply two numbers', () => {
    const params = {
      a: 5,
      b: 5,
      action: Action.Multiply,
    };

    const result = simpleCalculator(params);

    expect(result).toBe(25);
  });

  test('should divide two numbers', () => {
    const params = {
      a: 10,
      b: 5,
      action: Action.Divide,
    };

    const result = simpleCalculator(params);

    expect(result).toBe(2);
  });

  test('should exponentiate two numbers', () => {
    const params = {
      a: 2,
      b: 4,
      action: Action.Exponentiate,
    };

    const result = simpleCalculator(params);

    expect(result).toBe(16);
  });

  test('should return null for invalid action', () => {
    const params = {
      a: 2,
      b: 4,
      action: 'ADD',
    };

    const result = simpleCalculator(params);

    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const params = {
      a: 'A',
      b: 'B',
      action: Action.Add,
    };

    const result = simpleCalculator(params);

    expect(result).toBeNull();
  });
});
