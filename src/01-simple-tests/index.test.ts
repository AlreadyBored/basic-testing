// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 1, b: -1, action: Action.Add })).toBe(0);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 1, b: -1, action: Action.Subtract })).toBe(2);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 1, b: -1, action: Action.Multiply })).toBe(-1);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 10, b: 5, action: Action.Multiply })).toBe(50);
  });

  test('should exponentiate two numbers', () => {
    expect(
      simpleCalculator({
        a: 5,
        b: 3,
        action: Action.Exponentiate,
      }),
    ).toBe(125);
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 5, b: 3, action: '' })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: 's', b: 3, action: Action.Add })).toBeNull();
  });
});
