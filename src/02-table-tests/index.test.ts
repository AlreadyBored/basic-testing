// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 0, b: 0, action: Action.Add, expected: 0 },
  { a: -2, b: 7, action: Action.Add, expected: 5 },
  { a: 5, b: 3, action: Action.Subtract, expected: 2 },
  { a: 10, b: 15, action: Action.Subtract, expected: -5 },
  { a: -2, b: -3, action: Action.Subtract, expected: 1 },
  { a: 5, b: 3, action: Action.Multiply, expected: 15 },
  { a: -4, b: 2, action: Action.Multiply, expected: -8 },
  { a: 0, b: 100, action: Action.Multiply, expected: 0 },
  { a: 6, b: 3, action: Action.Divide, expected: 2 },
  { a: 10, b: 2, action: Action.Divide, expected: 5 },
  { a: -15, b: 5, action: Action.Divide, expected: -3 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: -2, b: 3, action: Action.Exponentiate, expected: -8 },
  { a: 5, b: 3, action: '%', expected: null },
  { a: 2, b: 4, action: '', expected: null },
  { a: 1, b: 1, action: 'invalid', expected: null },
  { a: '5', b: 3, action: Action.Add, expected: null },
  { a: 5, b: null, action: Action.Subtract, expected: null },
  { a: undefined, b: 2, action: Action.Multiply, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)('should blah-blah', ({ a, b, action, expected }) => {
    expect(simpleCalculator({ a, b, action })).toBe(expected);
  });
});
