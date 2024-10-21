// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    // Write your test here
    const simpleResult = simpleCalculator({ a: 1, b: 2, action: Action.Add });
    const invalidInputResult = simpleCalculator({
      a: 'str',
      b: 2,
      action: Action.Add,
    });
    const result = simpleCalculator({
      a: 100000021,
      b: 299378172,
      action: Action.Add,
    });
    expect(simpleResult).toEqual(2 + 1);
    expect(invalidInputResult).toEqual(null);
    expect(result).toEqual(100000021 + 299378172);
  });

  test('should subtract two numbers', () => {
    // Write your test here
    const simpleResult = simpleCalculator({
      a: 1,
      b: 2,
      action: Action.Subtract,
    });
    const invalidInputResult = simpleCalculator({
      a: 'str',
      b: 2,
      action: Action.Subtract,
    });
    const result = simpleCalculator({
      a: 100000021,
      b: 299378172,
      action: Action.Subtract,
    });
    expect(simpleResult).toEqual(1 - 2);
    expect(invalidInputResult).toEqual(null);
    expect(result).toEqual(100000021 - 299378172);
  });

  test('should multiply two numbers', () => {
    // Write your test here
    const simpleResult = simpleCalculator({
      a: 1,
      b: 2,
      action: Action.Multiply,
    });
    const invalidInputResult = simpleCalculator({
      a: 'str',
      b: 2,
      action: Action.Multiply,
    });
    const result = simpleCalculator({
      a: 100000021,
      b: 299378172,
      action: Action.Multiply,
    });
    expect(simpleResult).toEqual(1 * 2);
    expect(invalidInputResult).toEqual(null);
    expect(result).toEqual(100000021 * 299378172);
  });

  test('should divide two numbers', () => {
    // Write your test here
    const simpleResult = simpleCalculator({
      a: 1,
      b: 2,
      action: Action.Divide,
    });
    const invalidInputResult = simpleCalculator({
      a: 'str',
      b: 2,
      action: Action.Divide,
    });
    const result = simpleCalculator({
      a: 100000021,
      b: 299378172,
      action: Action.Divide,
    });
    expect(simpleResult).toEqual(1 / 2);
    expect(invalidInputResult).toEqual(null);
    expect(result).toEqual(100000021 / 299378172);
  });

  test('should exponentiate two numbers', () => {
    // Write your test here
    const simpleResult = simpleCalculator({
      a: 1,
      b: 2,
      action: Action.Exponentiate,
    });
    const invalidInputResult = simpleCalculator({
      a: 'str',
      b: 2,
      action: Action.Exponentiate,
    });
    const result = simpleCalculator({
      a: 100000021,
      b: 299378172,
      action: Action.Exponentiate,
    });
    expect(simpleResult).toEqual(1 ** 2);
    expect(invalidInputResult).toEqual(null);
    expect(result).toEqual(100000021 ** 299378172);
  });

  test('should return null for invalid action', () => {
    const invalidInputResult = simpleCalculator({
      a: 1,
      b: 0,
      action: '+-',
    });
    expect(invalidInputResult).toEqual(null);
  });

  test('should return null for invalid arguments', () => {
    // Write your test here
    const invalidFirstArgInputResult = simpleCalculator({
      a: 'str',
      b: 2,
      action: Action.Exponentiate,
    });
    const invalidSecondArgInputResult = simpleCalculator({
      a: 123,
      b: '123',
      action: Action.Exponentiate,
    });
    const invalidBothArgsInputResult = simpleCalculator({
      a: 'str',
      b: 2,
      action: Action.Exponentiate,
    });
    expect(invalidFirstArgInputResult).toEqual(null);
    expect(invalidSecondArgInputResult).toEqual(null);
    expect(invalidBothArgsInputResult).toEqual(null);
  });
});
