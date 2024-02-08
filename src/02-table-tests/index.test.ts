import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 23, b: 2, action: Action.Add, expected: 25 },
  { a: 56, b: 2, action: Action.Subtract, expected: 54 },
  { a: 34, b: 17, action: Action.Divide, expected: 2 },
  { a: 3, b: 23, action: Action.Multiply, expected: 69 },
  { a: 7, b: 2, action: Action.Exponentiate, expected: 49 },
  { a: '7', b: 2, action: Action.Exponentiate, expected: null },
  { a: '7', b: 2, action: 'get-exponent', expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    '$a $action $b should equal $expected',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
