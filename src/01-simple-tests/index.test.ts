import { simpleCalculator, Action } from './index';
import { expect } from '@jest/globals';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(
      simpleCalculator({
        a: 12,
        b: 30,
        action: Action.Add,
      }),
    ).toBe(42);
  });

  test('should subtract two numbers', () => {
    expect(
      simpleCalculator({
        a: 50,
        b: 8,
        action: Action.Subtract,
      }),
    ).toBe(42);
  });

  test('should multiply two numbers', () => {
    expect(
      simpleCalculator({
        a: 2,
        b: 21,
        action: Action.Multiply,
      }),
    ).toBe(42);
  });

  test('should divide two numbers', () => {
    expect(
      simpleCalculator({
        a: 84,
        b: 2,
        action: Action.Divide,
      }),
    ).toBe(42);
  });

  test('should exponentiate two numbers', () => {
    expect(
      simpleCalculator({
        a: 8,
        b: 2,
        action: Action.Exponentiate,
      }),
    ).toBe(64);
  });

  test('should return null for invalid action', () => {
    expect(
      simpleCalculator({
        a: 1,
        b: 0,
        action: 'invalid',
      }),
    ).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(
      simpleCalculator({
        a: null,
        b: false,
        action: undefined,
      }),
    ).toBeNull();
  });
});
