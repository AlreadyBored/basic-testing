// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  const a = 15;
  const b = 9;

  test('should add two numbers', () => {
    const input = { a, b, action: Action.Add };
    expect(simpleCalculator(input)).toBe(a + b);
  });

  test('should subtract two numbers', () => {
    const input = { a, b, action: Action.Subtract };
    expect(simpleCalculator(input)).toBe(a - b);
  });

  test('should multiply two numbers', () => {
    const input = { a, b, action: Action.Multiply };
    expect(simpleCalculator(input)).toBe(a * b);
  });

  test('should divide two numbers', () => {
    const input = { a, b, action: Action.Divide };
    expect(simpleCalculator(input)).toBe(a / b);
  });

  test('should exponentiate two numbers', () => {
    const input = { a, b, action: Action.Exponentiate };
    expect(simpleCalculator(input)).toBe(a ** b);
  });

  test('should return null for invalid action', () => {
    const input = { a, b, action: 'NotSupportedAction' };
    expect(simpleCalculator(input)).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    const input = { a: [], b, action: Action.Add };
    expect(simpleCalculator(input)).toBe(null);
  });
});
