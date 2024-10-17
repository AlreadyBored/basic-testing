// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const calculatorInput = {
      a: 2,
      b: 2,
      action: Action.Add,
    };

    const calculatorExpectedOutput = 4;

    const calculatorResult = simpleCalculator(calculatorInput);

    expect(calculatorResult).toBe(calculatorExpectedOutput);
  });

  test('should subtract two numbers', () => {
    const calculatorInput = {
      a: 6,
      b: -7,
      action: Action.Subtract,
    };

    const calculatorExpectedOutput = 13;

    const calculatorResult = simpleCalculator(calculatorInput);

    expect(calculatorResult).toBe(calculatorExpectedOutput);
  });

  test('should multiply two numbers', () => {
    const calculatorInput = {
      a: 7,
      b: 6,
      action: Action.Multiply,
    };

    const calculatorExpectedOutput = 42;

    const calculatorResult = simpleCalculator(calculatorInput);

    expect(calculatorResult).toBe(calculatorExpectedOutput);
  });

  test('should divide two numbers', () => {
    const calculatorInput = {
      a: 49,
      b: 7,
      action: Action.Divide,
    };

    const calculatorExpectedOutput = 7;

    const calculatorResult = simpleCalculator(calculatorInput);

    expect(calculatorResult).toBe(calculatorExpectedOutput);
  });

  test('should exponentiate two numbers', () => {
    const calculatorInput = {
      a: 2,
      b: 3,
      action: Action.Exponentiate,
    };

    const calculatorExpectedOutput = 8;

    const calculatorResult = simpleCalculator(calculatorInput);

    expect(calculatorResult).toBe(calculatorExpectedOutput);
  });

  test('should return null for invalid action', () => {
    const calculatorInput = {
      a: 25,
      b: 42,
      action: null,
    };

    const calculatorExpectedOutput = null;

    const calculatorResult = simpleCalculator(calculatorInput);

    expect(calculatorResult).toBe(calculatorExpectedOutput);
  });

  test('should return null for invalid arguments', () => {
    const calculatorInput = {
      a: '1',
      b: null,
      action: Action.Divide,
    };

    const calculatorExpectedOutput = null;

    const calculatorResult = simpleCalculator(calculatorInput);

    expect(calculatorResult).toBe(calculatorExpectedOutput);
  });
});
