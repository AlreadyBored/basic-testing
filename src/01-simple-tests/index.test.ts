// Uncomment the code below and write your tests
import { simpleCalculator } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 100, b: 200, action: '+' })).toBe(300);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 100, b: 200, action: '-' })).toBe(-100);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 100, b: 2, action: '*' })).toBe(200);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 100, b: 2, action: '/' })).toBe(50);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 100, b: 3, action: '^' })).toBe(1000000);
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 100, b: 200, action: '0' })).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: ':-)', b: 2, action: '+' })).toBe(null);
  });
});
