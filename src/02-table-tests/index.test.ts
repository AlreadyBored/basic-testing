import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 45, b: 2, action: Action.Subtract, expected: 43 },
  { a: 45, b: 2, action: Action.Multiply, expected: 90 },
  { a: 46, b: 2, action: Action.Divide, expected: 23 },
  { a: 9, b: 2, action: Action.Exponentiate, expected: 81 },
  { a: '9', b: 2, action: Action.Exponentiate, expected: null },
  { a: 9, b: 2, action: 'SomeAction', expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'Test simpleCalculator({a: $a, b: $b, action: $action})',
    (testCase) => {
      expect(simpleCalculator(testCase)).toBe(testCase.expected);
    },
    30000,
  );
});
