import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const input = {
      a: 8,
      b: 4,
      action: Action.Add,
    };

    expect(simpleCalculator(input)).toBe(12);
  });

  test('should subtract two numbers', () => {
    const input = {
      a: 12,
      b: 4,
      action: Action.Subtract,
    };

    expect(simpleCalculator(input)).toBe(8);
  });

  test('should multiply two numbers', () => {
    const input = {
      a: 8,
      b: 3,
      action: Action.Multiply,
    };

    expect(simpleCalculator(input)).toBe(24);
  });

  test('should divide two numbers', () => {
    const input = {
      a: 24,
      b: 4,
      action: Action.Divide,
    };

    expect(simpleCalculator(input)).toBe(6);
  });

  test('should exponentiate two numbers', () => {
    const input = {
      a: 2,
      b: 10,
      action: Action.Exponentiate,
    };

    expect(simpleCalculator(input)).toBe(1024);
  });

  test('should return null for invalid action', () => {
    const input = {
      a: 8,
      b: 10,
      action: 'InvalidAction',
    };

    expect(simpleCalculator(input)).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    const input = {
      a: '8',
      b: 4,
      action: Action.Add,
    };

    expect(simpleCalculator(input)).toBe(null);
  });
});
