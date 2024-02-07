import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 7, b: 2, action: Action.Subtract, expected: 5 },
  { a: 100, b: 2, action: Action.Subtract, expected: 98 },
  { a: 8, b: 8, action: Action.Subtract, expected: 0 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 1, b: 10, action: Action.Multiply, expected: 10 },
  { a: 0, b: 7, action: Action.Multiply, expected: 0 },
  { a: 10, b: 5, action: Action.Divide, expected: 2 },
  { a: 5, b: 5, action: Action.Divide, expected: 1 },
  { a: 12, b: 4, action: Action.Divide, expected: 3 },
  { a: 6, b: 3, action: Action.Exponentiate, expected: 216 },
  { a: 1, b: 1, action: Action.Exponentiate, expected: 1 },
  { a: 10, b: 0, action: Action.Exponentiate, expected: 1 },
  { a: 11, b: 11, action: 'invalid action', expected: null },
  { a: 5, b: 5, action: 'invalid action', expected: null },
  { a: 2, b: 2, action: 'invalid action', expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'evaluates simpleCalculator with input: %o',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
