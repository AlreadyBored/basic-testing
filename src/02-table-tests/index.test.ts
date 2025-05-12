// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  // cases from previous test
  { a: 4, b: 2, action: Action.Add, expected: 6 },
  { a: 4, b: 2, action: Action.Subtract, expected: 2 },
  { a: 4, b: 2, action: Action.Multiply, expected: 8 },
  { a: 4, b: 2, action: Action.Divide, expected: 2 },
  { a: 4, b: 2, action: Action.Exponentiate, expected: 16 },
  { a: 4, b: 2, action: '', expected: null },
  { a: '', b: 2, action: Action.Exponentiate, expected: null },
];

describe('simpleCalculator', () => {
  // Consider to use Jest table tests API to test all cases above
  test.each(testCases)('table tests', ({ a, b, action, expected }) => {
    expect(simpleCalculator({ a, b, action })).toBe(expected);
  });
});
