import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },

  { a: 6, b: 2, action: Action.Subtract, expected: 4 },
  { a: 10, b: 2, action: Action.Subtract, expected: 8 },
  { a: 15, b: 2, action: Action.Subtract, expected: 13 },

  { a: 6, b: 2, action: Action.Multiply, expected: 12 },
  { a: 10, b: 2, action: Action.Multiply, expected: 20 },
  { a: 15, b: 2, action: Action.Multiply, expected: 30 },

  { a: 6, b: 2, action: Action.Divide, expected: 3 },
  { a: 10, b: 2, action: Action.Divide, expected: 5 },
  { a: 16, b: 2, action: Action.Divide, expected: 8 },

  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 4, b: 4, action: Action.Exponentiate, expected: 256 },
  { a: 3, b: 3, action: Action.Exponentiate, expected: 27 },

  { a: '3', b: 2, action: Action.Exponentiate, expected: null },
  { a: 4, b: '4', action: Action.Exponentiate, expected: null },
  { a: 4, b: 4, action: 'invalid', expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'calculates $action of $a and $b as $expected',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
