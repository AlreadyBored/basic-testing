// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';
// const { simpleCalculator, Action } = require('./index');

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a:1, b:2, action:Action.Add })).toBe(3);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a:1, b:2, action:Action.Subtract})).toBe(-1);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a:1, b:2, action:Action.Multiply })).toBe(2);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a:1, b:2, action:Action.Divide })).toBe(0.5);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a:3, b:2, action:Action.Exponentiate })).toBe(9);
    // Write your test here
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a:1, b:2, action: 'wrong' })).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a:'butter', b:'bread', action:Action.Add })).toBe(null);
  });
});
