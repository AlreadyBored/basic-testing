// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 1, b: 2, action: Action.Subtract, expected: -1 },
  { a: 1, b: 2, action: Action.Multiply, expected: 2 },
  { a: 1, b: 2, action: Action.Divide, expected: 0.5 },
  { a: 1, b: 0, action: Action.Divide, expected: Infinity },
  { a: 1, b: 2, action: Action.Exponentiate, expected: 1 },
];

const invalidCases = [
  { a: 'invalid', b: 2, action: Action.Add },
  { a: 1, b: 'invalid', action: Action.Add },
  { a: 'invalid', b: 'invalid', action: Action.Add },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should return $expected for $a $action $b',
    (testCase) => {
      expect(simpleCalculator(testCase)).toBe(testCase.expected);
    },
  );

  test.each(invalidCases)(
    'should return null for invalid arguments: $a $b $action',
    (testCase) => {
      expect(simpleCalculator(testCase)).toBeNull();
    },
  );
});
