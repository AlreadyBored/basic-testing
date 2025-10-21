// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },

  { a: 9, b: 2, action: Action.Subtract, expected: 7 },
  { a: 8, b: 2, action: Action.Subtract, expected: 6 },
  { a: 7, b: 2, action: Action.Subtract, expected: 5 },

  { a: 42, b: 7, action: Action.Divide, expected: 6 },
  { a: 81, b: 9, action: Action.Divide, expected: 9 },
  { a: 15, b: 3, action: Action.Divide, expected: 5 },

  { a: 4, b: 7, action: Action.Multiply, expected: 28 },
  { a: 2, b: 5, action: Action.Multiply, expected: 10 },
  { a: 12, b: 12, action: Action.Multiply, expected: 144 },

  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 3, b: 4, action: Action.Exponentiate, expected: 81 },
  { a: 4, b: 5, action: Action.Exponentiate, expected: 1024 },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should return $expected when $a $action $b',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
