// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const res = simpleCalculator({
      a: 1,
      b: 2,
      action: Action.Add
    });
    expect(res).toBe(3);
  });

  test('should subtract two numbers', () => {
    const res = simpleCalculator({
      a: 10,
      b: 6,
      action: Action.Subtract
    });
    expect(res).toBe(4);
  });

  test('should multiply two numbers', () => {
    const res = simpleCalculator({
      a: 10,
      b: 6,
      action: Action.Multiply
    });
    expect(res).toBe(60);
  });

  test('should divide two numbers', () => {
    const res = simpleCalculator({
      a: 60,
      b: 6,
      action: Action.Divide
    });
    expect(res).toBe(10);
  });

  test('should exponentiate two numbers', () => {
    const res = simpleCalculator({
      a: 2,
      b: 5,
      action: Action.Exponentiate
    });
    expect(res).toBe(32);
  });

  test('should return null for invalid action', () => {
    const res = simpleCalculator({
      a: 60,
      b: 6,
      action: 'invalin action'
    });
    expect(res).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    const res = simpleCalculator({
      a: '60',
      b: '6',
      action: Action.Add
    });
    expect(res).toBe(null);
  });
});
