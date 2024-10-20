// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 10, b: 2, action: Action.Divide, expected: 5},
  { a: 1, b: 2, action: Action.Multiply, expected: 2},
  { a: 1, b: 2, action: Action.Subtract, expected: -1},
  { a: 10, b: 2, action: Action.Exponentiate, expected: 100},
  { a: 10, b: 2, action: 'invalid_action', expected: null},
  { a: 'abc', b: 2, action: Action.Add, expected: null}

];

describe('simpleCalculator', () => {
  // This test case is just to run this test suite, remove it when you write your own tests
  test.each(testCases)(
    'return $expected when a is $a, b is $b, and action is $action',
    ({ a, b, action, expected }) => {
      const input = { a: a, b: b, action: action };
      const result = simpleCalculator(input);
      expect(result).toBe(expected);
    },
  );
  // Consider to use Jest table tests API to test all cases above
});
