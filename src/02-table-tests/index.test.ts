// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 4, b: 2, action: Action.Subtract, expected: 2 },
  { a: 5, b: 2, action: Action.Subtract, expected: 3 },
  { a: 2, b: 2, action: Action.Divide, expected: 1 },
  { a: 4, b: 2, action: Action.Divide, expected: 2 },
  { a: 8, b: 2, action: Action.Divide, expected: 4 },
  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: 4, b: 2, action: Action.Multiply, expected: 8 },
  { a: 8, b: 2, action: Action.Multiply, expected: 16 },
  { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
  { a: 3, b: 3, action: Action.Exponentiate, expected: 27 },
  { a: 4, b: 4, action: Action.Exponentiate, expected: 256 },
];

describe('simpleCalculator', () => {
  // This test case is just to run this test suite, remove it when you write your own tests
  test('should blah-blah', () => {
    expect(true).toBe(true);
  });
  // Consider to use Jest table tests API to test all cases above

  test.each(testCases)(
    '$a $action $b = $expected',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
