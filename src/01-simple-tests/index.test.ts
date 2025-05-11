/* eslint-disable prettier/prettier */
// Uncomment the code below and write your tests;
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 5, b: 7, action: Action.Add })).toBe(12);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 5, b: 7, action: Action.Subtract })).toBe(-2);

  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 5, b: 7, action: Action.Multiply })).toBe(35);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 6, b: 3, action: Action.Divide })).toBe(2);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 6, b: 3, action: Action.Exponentiate })).toBe(216);
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 6, b: 3, action: "Action" })).toBe(null);

  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: "6", b: null, action: Action.Exponentiate })).toBe(null);

  });
});
