import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  // Test case for valid addition
  test('should add two numbers', () => {
    const result = simpleCalculator({ a: 5, b: 3, action: Action.Add });
    expect(result).toBe(8);
  });

  // Test case for valid subtraction
  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a: 5, b: 3, action: Action.Subtract });
    expect(result).toBe(2);
  });

  // Test case for valid multiplication
  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 5, b: 3, action: Action.Multiply });
    expect(result).toBe(15);
  });

  // Test case for valid division
  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 6, b: 3, action: Action.Divide });
    expect(result).toBe(2);
  });

  // Test case for division by zero
  test('should return null when dividing by zero', () => {
    const result = simpleCalculator({ a: 6, b: 0, action: Action.Divide });
    expect(result).toBeNull();  
  });

  // Test case for exponentiation
  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({ a: 2, b: 3, action: Action.Exponentiate });
    expect(result).toBe(8); 
  });

  // Test case for invalid action
  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a: 5, b: 3, action: 'invalid' });
    expect(result).toBeNull(); 
  });

  // Test case for invalid arguments (like passing a string instead of a number)
  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({ a: 'invalid', b: 3, action: Action.Add });
    expect(result).toBeNull();  
  });

  // Test case for invalid arguments (like passing non-numeric 'b')
  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({ a: 5, b: 'invalid', action: Action.Add });
    expect(result).toBeNull(); 
  });
});
