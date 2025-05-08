// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },

  { a: 10, b: 2, action: Action.Divide, expected: 5 },
  { a: 2, b: 2, action: Action.Divide, expected: 1 },
  { a: 3, b: 2, action: Action.Divide, expected: 1.5 },
  { a: 3, b: 3, action: Action.Divide, expected: 1 },

  { a: 1, b: 1, action: Action.Exponentiate, expected: 1 },
  { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
  { a: 2, b: 4, action: Action.Exponentiate, expected: 16 },
  { a: 2, b: 10, action: Action.Exponentiate, expected: 1024 },

  { a: 1, b: 2, action: Action.Multiply, expected: 2 },
  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 3, b: 3, action: Action.Multiply, expected: 9 },
  { a: 10, b: 0, action: Action.Multiply, expected: 0 },

  { a: 1, b: 2, action: Action.Subtract, expected: -1 },
  { a: 2, b: 2, action: Action.Subtract, expected: 0 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 20, b: 2, action: Action.Subtract, expected: 18 },
  { a: 3, b: 20, action: Action.Subtract, expected: -17 },
];

describe.each(testCases)('simpleCalculator', ({ a, b, action, expected }) => {
  it(`test ${action} for a: ${a} and b: ${b}, when ${expected} is the result`, () => {
    expect(simpleCalculator({ a, b, action })).toBe(expected);
  });
});
