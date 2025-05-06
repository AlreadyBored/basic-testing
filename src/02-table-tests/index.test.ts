// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 5, b: 3, action: Action.Subtract, expected: 2 },
  { a: 10, b: 4, action: Action.Subtract, expected: 6 },
  { a: 6, b: 2, action: Action.Multiply, expected: 12 },
  { a: 7, b: 3, action: Action.Multiply, expected: 21 },
  { a: 8, b: 2, action: Action.Divide, expected: 4 },
  { a: 9, b: 3, action: Action.Divide, expected: 3 },
  { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
  { a: 4, b: 2, action: 'INVALID_ACTION' as Action, expected: null }, // Invalid action
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'given %o should return %s',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
