import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },

  { a: 5, b: 3, action: Action.Subtract, expected: 2 },
  { a: 0, b: 7, action: Action.Subtract, expected: -7 },

  { a: 4, b: 3, action: Action.Multiply, expected: 12 },
  { a: -2, b: 5, action: Action.Multiply, expected: -10 },

  { a: 10, b: 2, action: Action.Divide, expected: 5 },
  { a: 9, b: 3, action: Action.Divide, expected: 3 },

  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 5, b: 0, action: Action.Exponentiate, expected: 1 },

  { a: 1, b: 2, action: '%', expected: null },
  { a: '1', b: 2, action: Action.Add, expected: null },
  { a: 1, b: null, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'simpleCalculator({ a: $a, b: $b, action: $action }) should return $expected',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
