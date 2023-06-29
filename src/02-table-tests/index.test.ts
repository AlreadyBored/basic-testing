// Uncomment the code below and write your tests
import { Action, simpleCalculator } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 4, b: 2, action: Action.Subtract, expected: 2 },
  { a: 5, b: 2, action: Action.Subtract, expected: 3 },
  { a: 4, b: 3, action: Action.Subtract, expected: 1 },
  { a: 4, b: 3, action: Action.Multiply, expected: 12 },
  { a: 4, b: 2, action: Action.Multiply, expected: 8 },
  { a: 5, b: 2, action: Action.Multiply, expected: 10 },
  { a: 4, b: 4, action: Action.Divide, expected: 1 },
  { a: 6, b: 3, action: Action.Divide, expected: 2 },
  { a: 4, b: 2, action: Action.Divide, expected: 2 },
  { a: 4, b: 2, action: Action.Exponentiate, expected: 16 },
  { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 3, b: 3, action: Action.Exponentiate, expected: 27 },
  { a: 3, b: 2, action: null, expected: null },
  { a: 7, b: 2, action: null, expected: null },
  { a: 3, b: 9, action: null, expected: null },
  { a: 'ghj', b: 9, action: Action.Subtract, expected: null },
  { a: '45678', b: 'dfghjk', action: Action.Subtract, expected: null },
  { a: 'ghj', b: 'dfgyh', action: Action.Multiply, expected: null },
];

describe('simpleCalculator', () => {
  // This test case is just to run this test suite, remove it when you write your own tests
  test('should blah-blah', () => {
    testCases.forEach((obj) => {
      expect(simpleCalculator({ a: obj.a, b: obj.b, action: obj.action })).toBe(
        obj.expected,
      );
    });
  });
  // Consider to use Jest table tests API to test all cases above
});
