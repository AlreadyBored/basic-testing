import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 99, b: 1, action: Action.Add, expected: 100 },
  { a: -3, b: 2, action: Action.Add, expected: -1 },
  { a: 10, b: 2, action: Action.Subtract, expected: 8 },
  { a: 10, b: 12, action: Action.Subtract, expected: -2 },
  { a: 0, b: 0, action: Action.Subtract, expected: 0 },
  { a: 0, b: 1, action: Action.Multiply, expected: 0 },
  { a: 10, b: -2, action: Action.Multiply, expected: -20 },
  { a: -1, b: -1337, action: Action.Multiply, expected: 1337 },
  { a: -1, b: -2, action: Action.Divide, expected: 0.5 },
  { a: -20, b: 10, action: Action.Divide, expected: -2 },
  { a: 1, b: 0, action: Action.Divide, expected: Infinity },
  { a: 1, b: 0, action: Action.Exponentiate, expected: 1 },
  { a: 4, b: -1, action: Action.Exponentiate, expected: 0.25 },
  { a: -2, b: 2, action: Action.Exponentiate, expected: 4 },
  { a: -2, b: -2, action: Action.Exponentiate, expected: 0.25 },
];

describe('simpleCalculator', () => {
  testCases.forEach((testCase) => {
    test(`should ${testCase.action} ${testCase.a} and ${testCase.b}`, () => {
      const result = simpleCalculator(testCase);
      expect(result).toBe(testCase.expected);
    });
  });
});
