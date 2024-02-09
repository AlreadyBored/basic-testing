import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a: 10, b: 4, action: Action.Add });
    expect(result).toBe(14);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a: 10, b: 4, action: Action.Subtract });
    expect(result).toBe(6);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 10, b: 4, action: Action.Multiply });
    expect(result).toBe(40);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 10, b: 4, action: Action.Divide });
    expect(result).toBe(2.5);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      a: 10,
      b: 4,
      action: Action.Exponentiate,
    });
    expect(result).toBe(10000);
  });

  test('should return null for invalid action', () => {
    const actionBlank = simpleCalculator({
      a: 10,
      b: 4,
      action: '',
    });
    expect(actionBlank).toBeNull();

    const actionWrong = simpleCalculator({
      a: 10,
      b: 4,
      action: '%',
    });
    expect(actionWrong).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const wrongA = simpleCalculator({
      a: 'a',
      b: 4,
      action: Action.Add,
    });
    expect(wrongA).toBeNull();

    const wrongB = simpleCalculator({
      a: 10,
      b: 'b',
      action: Action.Add,
    });
    expect(wrongB).toBeNull();
  });
});
