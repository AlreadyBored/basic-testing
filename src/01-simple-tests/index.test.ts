import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const input = { a: 10, b: 5, action: Action.Add };

    const result = simpleCalculator(input);

    expect(result).toBe(15);
  });

  test('should subtract two numbers', () => {
    const input = { a: 10, b: 5, action: Action.Subtract };

    const result = simpleCalculator(input);

    expect(result).toBe(5);
  });

  test('should multiply two numbers', () => {
    const input = { a: 10, b: 5, action: Action.Multiply };

    const result = simpleCalculator(input);

    expect(result).toBe(50);
  });

  test('should divide two numbers', () => {
    const input = { a: 10, b: 5, action: Action.Divide };

    const result = simpleCalculator(input);

    expect(result).toBe(2);
  });

  test('should exponentiate two numbers', () => {
    const input = { a: 10, b: 5, action: Action.Exponentiate };

    const result = simpleCalculator(input);

    expect(result).toBe(100000);
  });

  test('should return null for invalid action', () => {
    const input = { a: 10, b: 5, action: 'something' };

    const result = simpleCalculator(input);

    expect(result).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    const input = { a: 10, b: '5', action: 'something' };

    const result = simpleCalculator(input);

    expect(result).toBe(null);
  });
});
