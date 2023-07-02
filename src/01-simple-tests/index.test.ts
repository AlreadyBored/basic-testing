// Uncomment the code below and write your tests
// import { simpleCalculator, Action } from './index';

import { Action, simpleCalculator } from "01-simple-tests";

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({
      a: 11,
      b: 9,
      action: Action.Add,
    })).toEqual(20);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({
      a: 29,
      b: 9,
      action: Action.Subtract,
    })).toEqual(20);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({
      a: 2,
      b: 10,
      action: Action.Multiply,
    })).toEqual(20);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({
      a: 40,
      b: 2,
      action: Action.Divide,
    })).toEqual(20);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({
      a: 4,
      b: 2,
      action: Action.Exponentiate,
    })).toEqual(16);
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({
      a: 4,
      b: 2,
      action: "Action.Shmaction",
    })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({
      a: "four",
      b: 2,
      action: Action.Exponentiate,
    })).toBeNull();
    expect(simpleCalculator({
      a: 2,
      b: { c: 10 },
      action: Action.Add,
    })).toBeNull();
  });
});
