// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  const calculate = (action:Action)=>simpleCalculator({a:6, b:3, action})
  
  test('should add two numbers', () => {
    expect(calculate(Action.Add)).toBe(9);
  });

  test('should subtract two numbers', () => {
    expect(calculate(Action.Subtract)).toBe(3);
  });

  test('should multiply two numbers', () => {
    expect(calculate(Action.Multiply)).toBe(18);
  });

  test('should divide two numbers', () => {
    expect(calculate(Action.Divide)).toBe(2);
  });

  test('should exponentiate two numbers', () => {
    expect(calculate(Action.Exponentiate)).toBe(216);
  });

  test('should return null for invalid action', () => {
    // add as Action type to make invalid action as valid for testing
    const invalidAction = '+-' as Action
    expect(calculate(invalidAction)).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({a:'rr', b:3, action:Action.Add})).toBeNull();
  });
});
