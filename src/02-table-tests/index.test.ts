// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 2, b: 3, action: Action.Add, expected: 5 },
  { a: 2, b: -3, action: Action.Add, expected: -1 },
  { a: 2, b: 3, action: Action.Subtract, expected: -1 },
  { a: 2, b: -3, action: Action.Subtract, expected: 5 },
  { a: 2, b: 3, action: Action.Multiply, expected: 6 },
  { a: 2, b: -3, action: Action.Multiply, expected: -6 },
  { a: 6, b: 3, action: Action.Divide, expected: 2 },
  { a: 6, b: -3, action: Action.Divide, expected: -2 },
  { a: 6, b: 0, action: Action.Divide, expected: Infinity },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 2, b: -2, action: Action.Exponentiate, expected: 0.25 },
  { a: 3, b: 2, action: 'Exponentiate', expected: null },
  { a: '3', b: 2, action: Action.Exponentiate, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'simpleCalculatorTableTests',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
