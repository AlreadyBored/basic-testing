import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 5, b: 2, action: Action.Subtract, expected: 3 },
  { a: 4, b: 2, action: Action.Multiply, expected: 8 },
  { a: 10, b: 2, action: Action.Divide, expected: 5 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 0, b: 5, action: Action.Add, expected: 5 },
  { a: -5, b: 2, action: Action.Multiply, expected: -10 },
  { a: 10, b: 0, action: Action.Divide, expected: Infinity },
  { a: 2, b: 0, action: Action.Exponentiate, expected: 1 },
  { a: 1, b: 0, action: Action.Divide, expected: Infinity },
  { a: -3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 2, b: 0.5, action: Action.Exponentiate, expected: 1.4142135623730951 },
  { a: 1, b: 2, action: '%', expected: null },
  { a: 2, b: 3, action: '**', expected: null },
  { a: 3, b: 2, action: '++', expected: null },
  { a: '5', b: 2, action: Action.Add, expected: null },
  { a: 2, b: false, action: Action.Add, expected: null },
  { a: null, b: 2, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  testCases.forEach((testCase) => {
    const { a, b, action, expected } = testCase;

    test(`should perform ${action} operation on ${a} and ${b} and return ${expected}`, () => {
      const rawInput = { a, b, action };
      const result = simpleCalculator(rawInput);
      expect(result).toBe(expected);
    });
  });
});
