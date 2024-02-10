// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 4, b: 2, action: Action.Subtract, expected: 2 },
  { a: 4, b: 2, action: Action.Multiply, expected: 8 },
  { a: 8, b: 2, action: Action.Divide, expected: 4 },
  { a: 4, b: 2, action: Action.Exponentiate, expected: 16 },
  { a: 4, b: 2, action: 'Action.Subtract', expected: null },
  { a: '', b: 2, action: Action.Multiply, expected: null },
];

describe('simpleCalculator', () => {
  // This test case is just to run this test suite, remove it when you write your own tests
  test.each(testCases)('add(%i, %i, $s)', (arg) => {
    const { a, b, action, expected } = arg;
    expect(simpleCalculator({ a, b, action })).toBe(expected);
  });
  // Consider to use Jest table tests API to test all cases above
});
