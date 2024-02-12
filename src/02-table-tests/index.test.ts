// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },

  { a: 1, b: 3, action: Action.Subtract, expected: -2 },
  { a: 11, b: -10, action: Action.Subtract, expected: 21 },
  { a: -5, b: 1, action: Action.Subtract, expected: -6 },

  { a: 1, b: 3, action: Action.Multiply, expected: 3 },
  { a: 11, b: -10, action: Action.Multiply, expected: -110 },
  { a: 0, b: 0, action: Action.Multiply, expected: 0 },

  { a: 4, b: 2, action: Action.Divide, expected: 2 },
  { a: 27, b: -9, action: Action.Divide, expected: -3 },
  { a: 0, b: 0, action: Action.Divide, expected: NaN },

  { a: 1, b: 3, action: Action.Exponentiate, expected: 1 },
  { a: 11, b: 2, action: Action.Exponentiate, expected: 121 },
  { a: 154, b: 0, action: Action.Exponentiate, expected: 1 },

  { a: 1, b: 3, action: 'unknown', expected: null },
  { a: 11, b: -10, action: 'unknown', expected: null },
  { a: 0, b: 0, action: 'unknown', expected: null },

  { a: null, b: 2, action: Action.Add, expected: null },
  { a: undefined, b: 2, action: Action.Multiply, expected: null },
  { a: 3, b: 'test', action: Action.Divide, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should perform table testing, returning null in case of error',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
