import { simpleCalculator, Action } from './index';

const testCases = [
  // Valid cases
  { a: 3, b: 4, action: Action.Add, expected: 7 },
  { a: 4, b: 3, action: Action.Subtract, expected: 1 },
  { a: 4, b: 3, action: Action.Multiply, expected: 12 },
  { a: 4, b: 2, action: Action.Divide, expected: 2 },
  { a: 3, b: 3, action: Action.Exponentiate, expected: 27 },
  // Invalid cases
  { a: 3, b: 4, action: 'invalidAction', expected: null },
  { a: 'string', b: {}, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  testCases.forEach(({ a, b, action, expected }) => {
    const testName =
      expected !== null
        ? `should ${action} ${a} and ${b} to equal ${expected}`
        : `should return null for invalid input: ${action})`;
    test(testName, () => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    });
  });
});
