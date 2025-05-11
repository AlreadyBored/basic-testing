import { simpleCalculator, Action } from './index';

type RawCalculatorInput = {
  a: unknown;
  b: unknown;
  action: unknown;
};
describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const rawInput: RawCalculatorInput = {
      a: 1,
      b: 2,
      action: Action.Add,
    };
    expect(simpleCalculator(rawInput)).toEqual(3);
  });

  test('should subtract two numbers', () => {
    const rawInput: RawCalculatorInput = {
      a: 3,
      b: 2,
      action: Action.Subtract,
    };
    expect(simpleCalculator(rawInput)).toEqual(1);
  });

  test('should multiply two numbers', () => {
    const rawInput: RawCalculatorInput = {
      a: 2,
      b: 3,
      action: Action.Multiply,
    };
    expect(simpleCalculator(rawInput)).toEqual(6);
  });

  test('should divide two numbers', () => {
    const rawInput: RawCalculatorInput = {
      a: 10,
      b: 5,
      action: Action.Divide,
    };
    expect(simpleCalculator(rawInput)).toEqual(2);
  });

  test('should exponentiate two numbers', () => {
    const rawInput: RawCalculatorInput = {
      a: 2,
      b: 3,
      action: Action.Exponentiate,
    };
    expect(simpleCalculator(rawInput)).toEqual(8);
  });

  test('should return null for invalid action', () => {
    const rawInput: RawCalculatorInput = {
      a: 2,
      b: 3,
      action: !Action,
    };
    expect(simpleCalculator(rawInput)).toEqual(null);
  });

  test('should return null for invalid arguments', () => {
    const rawInput: RawCalculatorInput = {
      a: undefined,
      b: null,
      action: Action,
    };
    expect(simpleCalculator(rawInput)).toEqual(null);
  });
});
