// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 5, b: 3, action: Action.Subtract, expected: 2 },
  { a: 5, b: -2, action: Action.Subtract, expected: 7 },
  { a: 3, b: 0, action: Action.Subtract, expected: 3 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 3, b: 3, action: Action.Multiply, expected: 9 },
  { a: 3, b: 0, action: Action.Multiply, expected: 0 },
  { a: 8, b: 2, action: Action.Divide, expected: 4 },
  { a: 10, b: 5, action: Action.Divide, expected: 2 },
  { a: 8, b: 0, action: Action.Divide, expected: Infinity },
  { a: 5, b: 2, action: Action.Exponentiate, expected: 25 },
  { a: 3, b: 0, action: Action.Exponentiate, expected: 1 },
  { a: 5, b: -1, action: Action.Exponentiate, expected: 0.2 },
  { a: 5, b: 2, action: '%', expected: null },
  { a: 5, b: 1, action: '** 2', expected: null },
  { a: 5, b: '2', action: Action.Add, expected: null },
  { a: 'test', b: 3, action: Action.Divide, expected: null },
];

describe('simpleCalculator', () => {
  // This test case is just to run this test suite, remove it when you write your own tests
  test.each(testCases)(
    'should return $expected when given a: $a, b: $b and action: $action',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
  // Consider to use Jest table tests API to test all cases above
});
