// Uncomment the code below and write your tests
// import { simpleCalculator, Action } from './index';

import { simpleCalculator } from "./index";

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a: 2, b: 3, action: '+' });
    expect(result).toBe(5);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a: 10, b: 3, action: '-' });
    expect(result).toBe(7);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 8, b: 3, action: '*' });
    expect(result).toBe(24);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 44, b: 4, action: '/' });
    expect(result).toBe(11);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({ a: 2, b: 3, action: '^' });
    expect(result).toBe(8);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a: 2, b: 0, action: '&' });
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({ a: 'a', b: 'b', action: '+' });
    expect(result).toBeNull();
  });
});
