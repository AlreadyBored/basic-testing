 import {  simpleCalculator, Action } from './index';

const testCases = [
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    { a: 2, b: 2, action: Action.Add, expected: 4 },
    { a: 3, b: 2, action: Action.Add, expected: 5 },

    { a: 1, b: 2, action: Action.Subtract, expected: -1 },
    { a: -2, b: -2, action: Action.Subtract, expected: 0 },
    { a: -2, b: 2, action: Action.Subtract, expected: -4 },

    { a: 1, b: 2, action: Action.Multiply, expected: 2 },
    { a: 2, b: -2, action: Action.Multiply, expected: -4 },
    { a: -2, b: -2, action: Action.Multiply, expected: 4 },

    { a: 10, b: 2, action: Action.Divide, expected: 5 },
    { a: -10, b: 2, action: Action.Divide, expected: -5 },
    { a: -10, b: -2, action: Action.Divide, expected: 5 },

    { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
    { a: 2, b: -2, action: Action.Exponentiate, expected: 0.25 },
    { a: -2, b: -2, action: Action.Exponentiate, expected: 0.25 },

]; 

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should return $expected when $a is $action $b',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    }
  );

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a: 5, b: 2, action: '%' });
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({ a: '5', b: 2, action: Action.Add });
    expect(result).toBeNull();

    const result2 = simpleCalculator({ a: 5, b: null, action: Action.Add });
    expect(result2).toBeNull();
  });
});
