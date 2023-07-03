// Uncomment the code below and write your tests
 import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    // Write your test here
    expect(simpleCalculator({ a:5, b:7, action:Action.Add })).toBe(12);
    
  });

  test('should subtract two numbers', () => {
    // Write your test here
    expect(simpleCalculator({ a:30, b:5, action:Action.Subtract })).toBe(25);
  });

  test('should multiply two numbers', () => {
    // Write your test here
    expect(simpleCalculator({ a:6, b:5, action:Action.Multiply})).toBe(30);
  });

  test('should divide two numbers', () => {
    // Write your test here
    expect(simpleCalculator({ a:18, b:9, action:Action.Divide })).toBe(2);
  });

  test('should exponentiate two numbers', () => {
    // Write your test here
    expect(simpleCalculator({ a:3, b:2, action:Action.Exponentiate })).toBe(9);
  });

  test('should return null for invalid action', () => {
    // Write your test here
    expect(simpleCalculator({ a:30, b:5,  action: "" })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    // Write your test here
    expect(simpleCalculator({ a:30, b:"6", action:Action.Divide })).toBeNull();

  });
});
