// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    // Write your test here
    const params = {
      a: 10,
      b: 5,
      action: Action.Add
    }
    expect(simpleCalculator(params)).toBe(10 + 5);
  });

  test('should subtract two numbers', () => {
    // Write your test here
    const params = {
      a: 10,
      b: 5,
      action: Action.Subtract
    }
    expect(simpleCalculator(params)).toBe(10 - 5);
  });

  test('should multiply two numbers', () => {
    // Write your test here
    const params = {
      a: 10,
      b: 5,
      action: Action.Multiply
    }
    expect(simpleCalculator(params)).toBe(10 * 5);
  });

  test('should divide two numbers', () => {
    // Write your test here
    const params = {
      a: 10,
      b: 5,
      action: Action.Divide
    }
    expect(simpleCalculator(params)).toBe(10 / 5);
  });

  test('should exponentiate two numbers', () => {
    // Write your test here
    const params = {
      a: 10,
      b: 5,
      action: Action.Exponentiate
    }
    expect(simpleCalculator(params)).toBe(10 ** 5);
  });

  test('should return null for invalid action', () => {
    // Write your test here
    const params = {
      a: 10,
      b: 5,
      action: "**"
    }
    expect(simpleCalculator(params)).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    // Write your test here
    const params = {
      a: 10,
      b: "asd",
      action: Action.Add
    }
    expect(simpleCalculator(params)).toBeNull();
  });
});
