import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 9, b: 7, action: Action.Subtract, expected: 2 },
  { a: -6, b: -1, action: Action.Subtract, expected: -5 },
  { a: 8, b: 8, action: Action.Subtract, expected: 0 },
  { a: 13, b: 0, action: Action.Multiply, expected: 0 },
  { a: 2, b: -2, action: Action.Multiply, expected: -4 },
  { a: 3, b: 20, action: Action.Multiply, expected: 60 },
  { a: 1, b: 0, action: Action.Divide, expected: Infinity },
  { a: 24, b: 6, action: Action.Divide, expected: 4 },
  { a: 35, b: -7, action: Action.Divide, expected: -5 },
  { a: 2, b: 5, action: Action.Exponentiate, expected: 32 },
  { a: 1, b: 20, action: Action.Exponentiate, expected: 1 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
];

describe('simpleCalculator', () => {
  testCases.forEach((testCaseData, index) => {
    const { a, b, action, expected } = testCaseData;

    test(`Test №${index}: ${a} ${action} ${b} should be ${expected}`, () => {
      const calculatorResult = simpleCalculator({ a, b, action });

      expect(calculatorResult).toBe(expected);
    });
  });
});
