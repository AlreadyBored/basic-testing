// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  // continue cases for other actions
  { a: 20, b: 2, action: Action.Subtract, expected: 18 },
  { a: 20, b: 3, action: Action.Multiply, expected: 60 },
  { a: 40, b: 8, action: Action.Divide, expected: 5 },
  { a: 3, b: 3, action: Action.Exponentiate, expected: 27 },
  { a: 10, b: 3, action: 'sasa', expected: null }, // for invalid action
  { a: '44', b: 3, action: Action.Multiply, expected: null }, // for invalid arguments
];

describe('simpleCalculator', () => {
  // This test case is just to run this test suite, remove it when you write your own tests
  // test('should blah-blah', () => {
  //   expect(true).toBe(true);
  // });
  // Consider to use Jest table tests API to test all cases above

  test.each(testCases)('$name', ({ a, b, action, expected }) => {
    expect(simpleCalculator({ a, b, action })).toBe(expected);
  });
});
