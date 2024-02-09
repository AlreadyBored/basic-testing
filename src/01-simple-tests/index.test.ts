// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const res = simpleCalculator({
      a: 0.1,
      b: 0.2,
      action: Action.Add
    })
    expect(res).toBeCloseTo(0.3);
  });

  test('should subtract two numbers', () => {
    const res = simpleCalculator({
      a: 10,
      b: 5,
      action: Action.Subtract
    })
    expect(res).toEqual(5);
  });

  test('should multiply two numbers', () => {
    const res = simpleCalculator({
      a: 0.1,
      b: 0.2,
      action: Action.Multiply
    })
    expect(res).toBeCloseTo(0.02);
  });

  test('should divide two numbers', () => {
    const res = simpleCalculator({
      a: 9,
      b: 5,
      action: Action.Divide
    })
    expect(res).toEqual(1.8);
  });

  test('should exponentiate two numbers', () => {
    const res = simpleCalculator({
      a: 9,
      b: 2,
      action: Action.Exponentiate
    })
    expect(res).toEqual(81);
  });

  test('should return null for invalid action', () => {
    const res = simpleCalculator({
      a: 9,
      b: 5,
      action: 'bla'
    })
    expect(res).toEqual(null);
  });

  test('should return null for invalid arguments', () => {
    const res = simpleCalculator({
      a: null,
      b: 'bla',
      action: Action.Divide
    })
    expect(res).toEqual(null);
  });
});
