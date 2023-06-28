// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const action = Action.Add;

    expect(simpleCalculator({ a: 5, b: 5, action })).toBe(10);
    expect(simpleCalculator({ a: -15, b: 5, action })).toBe(-10);
  });

  test('should subtract two numbers', () => {
    const action = Action.Subtract;

    expect(simpleCalculator({ a: 15, b: 5, action })).toBe(10);
    expect(simpleCalculator({ a: 5, b: 15, action })).toBe(-10);
  });

  test('should multiply two numbers', () => {
    const action = Action.Multiply;

    expect(simpleCalculator({ a: 5, b: 5, action })).toBe(25);
    expect(simpleCalculator({ a: -5, b: 5, action })).toBe(-25);
  });

  test('should divide two numbers', () => {
    const action = Action.Divide;

    expect(simpleCalculator({ a: 25, b: 5, action })).toBe(5);
    expect(simpleCalculator({ a: -25, b: 5, action })).toBe(-5);
  });

  test('should exponentiate two numbers', () => {
    const action = Action.Exponentiate;

    expect(simpleCalculator({ a: 25, b: 5, action })).toBe(9765625);
    expect(simpleCalculator({ a: -25, b: 5, action })).toBe(-9765625);
  });

  test('should return null for invalid action', () => {
    const action = '|';

    expect(simpleCalculator({ a: 25, b: 5, action })).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: 5, b: 'string', action: Action.Add })).toBe(
      null,
    );
    expect(simpleCalculator({ a: 5, b: null, action: Action.Subtract })).toBe(
      null,
    );
    expect(simpleCalculator({ a: 'string', b: 5, action: Action.Divide })).toBe(
      null,
    );
    expect(
      simpleCalculator({ a: 'string', b: 'string', action: Action.Multiply }),
    ).toBe(null);
    expect(
      simpleCalculator({ a: null, b: null, action: Action.Exponentiate }),
    ).toBe(null);
  });
});
