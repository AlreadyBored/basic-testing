// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const case_1 = {
      a: 2,
      b: 3,
      action: Action.Add,
    };
    const case_2 = {
      a: 2,
      b: -3,
      action: Action.Add,
    };
    expect(simpleCalculator(case_1)).toEqual(5);
    expect(simpleCalculator(case_2)).toEqual(-1);
  });

  test('should subtract two numbers', () => {
    const case_1 = {
      a: 2,
      b: 3,
      action: Action.Subtract,
    };
    const case_2 = {
      a: 2,
      b: -3,
      action: Action.Subtract,
    };
    expect(simpleCalculator(case_1)).toEqual(-1);
    expect(simpleCalculator(case_2)).toEqual(5);
  });

  test('should multiply two numbers', () => {
    const case_1 = {
      a: 2,
      b: 3,
      action: Action.Multiply,
    };
    const case_2 = {
      a: 2,
      b: -3,
      action: Action.Multiply,
    };
    expect(simpleCalculator(case_1)).toEqual(6);
    expect(simpleCalculator(case_2)).toEqual(-6);
  });

  test('should divide two numbers', () => {
    const case_1 = {
      a: 6,
      b: 3,
      action: Action.Divide,
    };
    const case_2 = {
      a: 6,
      b: -3,
      action: Action.Divide,
    };
    const case_3 = {
      a: 6,
      b: 0,
      action: Action.Divide,
    };
    expect(simpleCalculator(case_1)).toEqual(2);
    expect(simpleCalculator(case_2)).toEqual(-2);
    expect(simpleCalculator(case_3)).toEqual(Infinity);
  });

  test('should exponentiate two numbers', () => {
    const case_1 = {
      a: 3,
      b: 2,
      action: Action.Exponentiate,
    };
    const case_2 = {
      a: 2,
      b: -2,
      action: Action.Exponentiate,
    };
    expect(simpleCalculator(case_1)).toEqual(9);
    expect(simpleCalculator(case_2)).toEqual(0.25);
  });

  test('should return null for invalid action', () => {
    const case_1 = {
      a: 3,
      b: 2,
      action: 'Exponentiate',
    };
    expect(simpleCalculator(case_1)).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const case_1 = {
      a: '3',
      b: 2,
      action: Action.Exponentiate,
    };
    expect(simpleCalculator(case_1)).toBeNull();
  });
});
