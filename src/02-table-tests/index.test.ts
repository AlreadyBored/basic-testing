// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 7, b: 2, action: Action.Subtract, expected: 5 },
  { a: 8, b: 2, action: Action.Divide, expected: 4 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: '3', b: 2, action: Action.Add, expected: null },
  { a: 3, b: '2', action: Action.Add, expected: null },
  { a: true, b: 2, action: Action.Add, expected: null },
  { a: 3, b: 2, action: 'Action.Add', expected: null },
  { a: 3, b: 2, action: null, expected: null },
  { a: 3, b: 2, action: Action, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'Should return $expected for $a $action $b',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );
});
