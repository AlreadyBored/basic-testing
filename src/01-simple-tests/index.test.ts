// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const sum = simpleCalculator({ a: 2, b: 2, action: Action.Add });

    expect(sum).toBe(4);
  });

  test('should subtract two numbers', () => {
    const subtracttion = simpleCalculator({
      a: 10,
      b: 2,
      action: Action.Subtract,
    });

    expect(subtracttion).toBe(8);
  });

  test('should multiply two numbers', () => {
    const multiplycation = simpleCalculator({
      a: 10,
      b: 2,
      action: Action.Multiply,
    });

    expect(multiplycation).toBe(20);
  });

  test('should divide two numbers', () => {
    const division = simpleCalculator({
      a: 10,
      b: 2,
      action: Action.Divide,
    });

    expect(division).toBe(5);
  });

  test('should exponentiate two numbers', () => {
    const exponention = simpleCalculator({
      a: 2,
      b: 4,
      action: Action.Exponentiate,
    });

    expect(exponention).toBe(16);
  });

  test('should return null for invalid action', () => {
    const nonExistendAction = simpleCalculator({
      a: 2,
      b: 4,
      action: 'non existend action',
    });

    expect(nonExistendAction).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    const nonExistendAction = simpleCalculator({
      a: '2',
      b: '4',
      action: Action.Exponentiate,
    });

    expect(nonExistendAction).toBe(null);
  });
});
