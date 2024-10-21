import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 0, action: Action.Add, expected: 2 },
  { a: 3, b: -2, action: Action.Add, expected: 1 },
  { a: 1, b: 2, action: Action.Subtract, expected: -1 },
  { a: 2, b: -2, action: Action.Subtract, expected: 4 },
  { a: 3, b: 0, action: Action.Subtract, expected: 3 },
  { a: 1, b: 2, action: Action.Divide, expected: 0.5 },
  { a: 2, b: -2, action: Action.Divide, expected: -1 },
  { a: 3, b: 0, action: Action.Divide, expected: Infinity },
  { a: 1, b: 2, action: Action.Multiply, expected: 2 },
  { a: 2, b: -2, action: Action.Multiply, expected: -4 },
  { a: 3, b: 0, action: Action.Multiply, expected: 0 },
  { a: 1, b: 2, action: Action.Exponentiate, expected: 1 },
  { a: 2, b: -2, action: Action.Exponentiate, expected: 0.25 },
  { a: 3, b: 0, action: Action.Exponentiate, expected: 1 },
];

const nullTestCases = [
  { a: 1, b: '2', action: Action.Add },
  { a: 1, b: null, action: Action.Add },
  { a: 2, b: 0, action: '!' },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should return $expected when $a is $action $b',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );

  test.each(nullTestCases)(
    'should return null when $a is $action $b',
    ({ a, b, action }) => {
      expect(simpleCalculator({ a, b, action })).toBeNull();
    },
  );
});
