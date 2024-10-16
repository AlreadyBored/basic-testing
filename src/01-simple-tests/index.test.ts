import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(
      simpleCalculator({
        a: 2,
        b: 3,
        action: Action.Add,
      }),
    ).toBe(5);
  });

  test('should subtract two numbers', () => {
    expect(
      simpleCalculator({
        a: 3,
        b: 2,
        action: Action.Subtract,
      }),
    ).toBe(1);
  });

  test('should multiply two numbers', () => {
    expect(
      simpleCalculator({
        a: 2,
        b: 3,
        action: Action.Multiply,
      }),
    ).toBe(6);
  });

  test('should divide two numbers', () => {
    expect(
      simpleCalculator({
        a: 4,
        b: 2,
        action: Action.Divide,
      }),
    ).toBe(2);
  });

  test('should exponentiate two numbers', () => {
    expect(
      simpleCalculator({
        a: 3,
        b: 2,
        action: Action.Exponentiate,
      }),
    ).toBe(9);
  });

  test('should return null for invalid action', () => {
    expect(
      simpleCalculator({
        a: 3,
        b: 2,
        action: 'unknownAction',
      }),
    ).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    expect(
      simpleCalculator({
        a: '3',
        b: 2,
        action: Action.Add,
      }),
    ).toBe(null);
  });
});
