// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 2, action: Action.Add })).toEqual(4);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 0, b: 1, action: Action.Subtract })).toEqual(
      -1,
    );
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: -2, b: 2, action: Action.Multiply })).toEqual(
      -4,
    );
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 4, b: 2, action: Action.Divide })).toEqual(2);
  });

  test('should exponentiate two numbers', () => {
    expect(
      simpleCalculator({ a: -4, b: 2, action: Action.Exponentiate }),
    ).toEqual(16);
  });

  test('should return null for invalid action', () => {
    expect(
      simpleCalculator({ a: 0, b: 0, action: 'Invalid Action' }),
    ).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: 'a', b: 'b', action: Action.Add })).toBeNull();
  });
});
