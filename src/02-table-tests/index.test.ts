// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 5, b: 2, action: Action.Subtract, expected: 3 },
  { a: 6, b: 2, action: Action.Subtract, expected: 4 },
  { a: 7, b: 2, action: Action.Subtract, expected: 5 },
  { a: 5, b: 2, action: Action.Multiply, expected: 10 },
  { a: 5, b: 3, action: Action.Multiply, expected: 15 },
  { a: 5, b: 4, action: Action.Multiply, expected: 20 },
  { a: 5, b: 5, action: Action.Divide, expected: 1 },
  { a: 10, b: 5, action: Action.Divide, expected: 2 },
  { a: 15, b: 5, action: Action.Divide, expected: 3 },
  { a: 1, b: 1, action: Action.Exponentiate, expected: 1 },
  { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
  { a: 3, b: 3, action: Action.Exponentiate, expected: 27 },
  { a: 3, b: 3, action: 'l', expected: null },
  { a: 3, b: 3, action: 'd', expected: null },
  { a: 3, b: 3, action: 'p', expected: null },
  { a: 3, b: 'r', action: Action.Exponentiate, expected: null },
  { a: 'r', b: 2, action: Action.Exponentiate, expected: null },
  { a: 4, b: 'r', action: Action.Exponentiate, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)('теst', ({ a, b, action, expected }) => {
    expect(simpleCalculator({ a, b, action })).toBe(expected);
  });
});
