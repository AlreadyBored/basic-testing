// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 6, b: 3, action: Action.Add })).toBe(9);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 6, b: 3, action: Action.Subtract })).toBe(3);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 6, b: 3, action: Action.Multiply })).toBe(18);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 6, b: 3, action: Action.Divide })).toBe(2);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 3, action: Action.Exponentiate })).toBe(8);
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 2, b: 3, action: 'invalid' })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
     expect(simpleCalculator({ a: 6, b: 'NaN', action: Action.Divide })).toBeNull();
     expect(simpleCalculator({ a: 'NaN', b: 3, action: Action.Add })).toBeNull();
  });
});
