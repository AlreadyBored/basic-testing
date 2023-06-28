// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 4, b: 2, action: Action.Divide, expected: 2 },
  { a: 5, b: 2, action: Action.Exponentiate, expected: 25 },
  // continue cases for other actions
];

describe.each(testCases)('simpleCalculator', ({ a, b, action, expected }) => {
  test(`Expression ${a} ${action} ${b} should be equal to ${expected}`, () => {
    expect(simpleCalculator({ a, b, action })).toBe(expected);
  });
  // Consider to use Jest table tests API to test all cases above
});
