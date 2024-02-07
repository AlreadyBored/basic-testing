// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(
      simpleCalculator({
        a: 478539,
        b: 758375,
        action: Action.Add,
      }),
    ).toEqual(1236914);
  });

  test('should subtract two numbers', () => {
    expect(
      simpleCalculator({
        a: 936813,
        b: 273485,
        action: Action.Subtract,
      }),
    ).toEqual(663328);
  });

  test('should multiply two numbers', () => {
    expect(
      simpleCalculator({
        a: 4723,
        b: 6791,
        action: Action.Multiply,
      }),
    ).toEqual(32073893);
  });

  test('should divide two numbers', () => {
    expect(
      simpleCalculator({
        a: 9879653,
        b: 24586,
        action: Action.Divide,
      }),
    ).toEqual(401.8406003416579);
  });

  test('should exponentiate two numbers', () => {
    expect(
      simpleCalculator({
        a: 34,
        b: 5,
        action: Action.Exponentiate,
      }),
    ).toEqual(45435424);
  });

  test('should return null for invalid action', () => {
    expect(
      simpleCalculator({
        a: 8,
        b: 4,
        action: 'INVALID ACTION',
      }),
    ).toEqual(null);
  });

  test('should return null for invalid arguments', () => {
    expect(
      simpleCalculator({
        a: { prop: 'value' },
        b: [1, 2, 3],
        action: Action.Subtract,
      }),
    ).toEqual(null);
  });
});
