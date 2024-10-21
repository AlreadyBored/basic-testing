// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Add })).toBe(3);
    expect(simpleCalculator({ a: 2, b: 3, action: Action.Add })).toBe(5);
    expect(simpleCalculator({ a: 3, b: 4, action: Action.Add })).toBe(7);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Subtract })).toBe(-1);
    expect(simpleCalculator({ a: 2, b: 3, action: Action.Subtract })).toBe(-1);
    expect(simpleCalculator({ a: 3, b: 4, action: Action.Subtract })).toBe(-1);
    expect(simpleCalculator({ a: 4, b: 3, action: Action.Subtract })).toBe(1);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Multiply })).toBe(2);
    expect(simpleCalculator({ a: 2, b: 3, action: Action.Multiply })).toBe(6);
    expect(simpleCalculator({ a: 3, b: 4, action: Action.Multiply })).toBe(12);
    expect(simpleCalculator({ a: 5, b: 3, action: Action.Multiply })).toBe(15);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Divide })).toBe(0.5);
    expect(simpleCalculator({ a: 6, b: 3, action: Action.Divide })).toBe(2);
    expect(simpleCalculator({ a: 12, b: 4, action: Action.Divide })).toBe(3);
    expect(simpleCalculator({ a: 15, b: 3, action: Action.Divide })).toBe(5);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Exponentiate })).toBe(
      1,
    );
    expect(simpleCalculator({ a: 2, b: 3, action: Action.Exponentiate })).toBe(
      8,
    );
    expect(simpleCalculator({ a: 3, b: 4, action: Action.Exponentiate })).toBe(
      81,
    );
    expect(simpleCalculator({ a: 5, b: 3, action: Action.Exponentiate })).toBe(
      125,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: 'Invalid' as Action })).toBe(
      null,
    );
    expect(simpleCalculator({ a: 2, b: 3, action: 'Invalid' as Action })).toBe(
      null,
    );
    expect(simpleCalculator({ a: 3, b: 4, action: 'Invalid' as Action })).toBe(
      null,
    );
    expect(simpleCalculator({ a: 5, b: 3, action: 'Invalid' as Action })).toBe(
      null,
    );
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: 'three', b: 2, action: Action.Add })).toBe(
      null,
    );
  });
});
