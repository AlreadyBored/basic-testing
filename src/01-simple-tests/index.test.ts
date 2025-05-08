import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(
      simpleCalculator({
        a: 1,
        b: 1,
        action: Action.Add,
      }),
    ).toBe(2);
  });

  test('should subtract two numbers', () => {
    expect(
      simpleCalculator({
        a: 1,
        b: 1,
        action: Action.Subtract,
      }),
    ).toBe(0);
  });

  test('should multiply two numbers', () => {
    expect(
      simpleCalculator({
        a: 0.1,
        b: 2,
        action: Action.Multiply,
      }),
    ).toBe(0.2);
  });

  test('should divide two numbers', () => {
    expect(
      simpleCalculator({
        a: 0.1,
        b: 0.2,
        action: Action.Divide,
      }),
    ).toBe(0.5);
  });

  test('should exponentiate two numbers', () => {
    expect(
      simpleCalculator({
        a: 2,
        b: 3,
        action: Action.Exponentiate,
      }),
    ).toBe(8);
  });

  test('should return null for invalid action', () => {
    expect(
      simpleCalculator({
        a: 2,
        b: 3,
        action: 'Invalid',
      }),
    ).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    expect(
      simpleCalculator({
        a: '2',
        b: '3',
        action: Action.Add,
      }),
    ).toBe(null);
  });
});
