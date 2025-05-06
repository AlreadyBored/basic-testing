// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    // Write your test here
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Add })).toBe(3);
  });

  test('should subtract two numbers', () => {
    // Write your test here
    expect(simpleCalculator({ a: 5, b: 2, action: Action.Subtract })).toBe(3);
  });

  test('should multiply two numbers', () => {
    // Write your test here
    expect(simpleCalculator({ a: 3, b: 4, action: Action.Multiply })).toBe(12);
  });

  test('should divide two numbers', () => {
    // Write your test here
    expect(simpleCalculator({ a: 8, b: 2, action: Action.Divide })).toBe(4);
  });

  test('should exponentiate two numbers', () => {
    // Write your test here
    expect(simpleCalculator({ a: 2, b: 3, action: Action.Exponentiate })).toBe(
      8,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: 'invalid' })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    // Write your test here
    expect(simpleCalculator({ a: '1', b: '2', action: Action.Add })).toBeNull();
  });
});
