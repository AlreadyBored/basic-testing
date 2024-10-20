// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 1, b: 2, action: Action.Subtract, expected: -1 },
  { a: 1, b: 2, action: Action.Multiply, expected: 2 },
  { a: 1, b: 2, action: Action.Divide, expected: 0.5 },
  { a: 1, b: 2, action: Action.Divide, expected: 0.5 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 1, b: 2, action: 'toast', expected: null },
  { a: 'butter', b: 'bread', action: Action.Add, expected: null },
];

describe('should perform simpleCalculator action with expected result', () => {
  // Consider to use Jest table tests API to test all cases above
  test.each(testCases)(
    'should perform simpleCalculator action with expected result',
    ({ a, b, action, expected }) => {
      const testResult = simpleCalculator({ a, b, action });
      expect(testResult).toBe(expected);
    },
  );
});
