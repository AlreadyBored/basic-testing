import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 4, b: 2, action: Action.Subtract, expected: 2 },
  { a: 6, b: 2, action: Action.Subtract, expected: 4 },
  { a: 5, b: 3, action: Action.Multiply, expected: 15 },
  { a: 7, b: 3, action: Action.Multiply, expected: 21 },
  { a: 9, b: 3, action: Action.Divide, expected: 3 },
  { a: 25, b: 5, action: Action.Divide, expected: 5 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 3, b: 4, action: Action.Exponentiate, expected: 81 },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should perform "$action" operation with $a and $b and return $expected',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );
});
