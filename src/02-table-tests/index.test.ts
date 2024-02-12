import { simpleCalculator, Action } from './index';

const testCases = [
  // Add
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },

  // Subtract
  { a: 1, b: 2, action: Action.Subtract, expected: -1 },
  { a: 2, b: 2, action: Action.Subtract, expected: 0 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },

  // Divide
  { a: 100, b: 2, action: Action.Divide, expected: 50 },
  { a: 24, b: 24, action: Action.Divide, expected: 1 },
  { a: 10, b: 1, action: Action.Divide, expected: 10 },

  // Multiply
  { a: 100, b: 2, action: Action.Multiply, expected: 200 },
  { a: 24, b: 0, action: Action.Multiply, expected: 0 },
  { a: 10, b: 1, action: Action.Multiply, expected: 10 },

  // Exponentiate
  { a: 100, b: 2, action: Action.Exponentiate, expected: 10000 },
  { a: 2, b: 10, action: Action.Exponentiate, expected: 1024 },
  { a: 10, b: 1, action: Action.Exponentiate, expected: 10 },

  // Null if wrong action
  { a: 100, b: 2, action: null, expected: null },
  { a: 2, b: 10, action: false, expected: null },
  { a: 10, b: 1, action: 'hellow', expected: null },

  // Null if wrong arguments
  { a: false, b: 2, action: Action.Add, expected: null },
  { a: 2, b: false, action: Action.Subtract, expected: null },
  { a: null, b: null, action: Action.Exponentiate, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should return expected result',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
