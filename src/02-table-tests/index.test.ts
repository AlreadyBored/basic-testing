// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 2, b: 2, action: Action.Subtract, expected: 0 },
  { a: 6, b: 2, action: Action.Subtract, expected: 4 },
  { a: 1, b: 1, action: Action.Multiply, expected: 1 },
  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: 6, b: 2, action: Action.Multiply, expected: 12 },
  { a: 12, b: 6, action: Action.Divide, expected: 2 },
  { a: 2, b: 2, action: Action.Divide, expected: 1 },
  { a: 6, b: 2, action: Action.Divide, expected: 3 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 1, b: 3, action: Action.Exponentiate, expected: 1 },
  { a: 6, b: 2, action: Action.Exponentiate, expected: 36 },
  { a: 6, b: null, action: Action.Exponentiate, expected: null },
  { a: 6, b: 5, action: '&&', expected: null },
];

describe('simpleCalculator', () => {
  it.each(testCases)(
    'The correct values must be calculated',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );
});
