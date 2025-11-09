import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 5, b: 3, action: Action.Subtract, expected: 2 },
  { a: 3, b: 4, action: Action.Subtract, expected: -1 },
  { a: 2, b: 3, action: Action.Multiply, expected: 6 },
  { a: 4, b: 2, action: Action.Multiply, expected: 8 },
  { a: 6, b: 2, action: Action.Divide, expected: 3 },
  { a: 10, b: 5, action: Action.Divide, expected: 2 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should compute $a $action $b = $expected',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );
});