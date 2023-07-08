import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 4, b: -6, action: Action.Add, expected: -2 },
  { a: -5, b: -9, action: Action.Subtract, expected: 4 },
  { a: 4, b: -8, action: Action.Multiply, expected: -32 },
  { a: 63, b: -7, action: Action.Divide, expected: -9 },
  { a: 2, b: 4, action: Action.Exponentiate, expected: 16 },
  { a: 2, b: 3, action: 'log', expected: null },
  { a: '2', b: 3, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    '$action in $a and $b should result as $expected',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
