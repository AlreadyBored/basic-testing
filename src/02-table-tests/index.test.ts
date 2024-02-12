import { simpleCalculator, Action } from './index';

const testCases = [
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    { a: 2, b: 2, action: Action.Add, expected: 4 },
    { a: 3, b: 2, action: Action.Add, expected: 5 },

    { a: 3, b: 1, action: Action.Subtract, expected: 2 },
    { a: 5, b: 3, action: Action.Subtract, expected: 2 },
    { a: 10, b: 7, action: Action.Subtract, expected: 3 },

    { a: 3, b: 2, action: Action.Multiply, expected: 6 },
    { a: 5, b: 4, action: Action.Multiply, expected: 20 },
    { a: 6, b: 0, action: Action.Multiply, expected: 0 },

    { a: 10, b: 2, action: Action.Divide, expected: 5 },
    { a: 8, b: 4, action: Action.Divide, expected: 2 },
    { a: 3, b: 0, action: Action.Divide, expected: Infinity },

    { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
    { a: 4, b: 0, action: Action.Exponentiate, expected: 1 }, 
];

describe('simpleCalculator', () => {
  testCases.forEach(({ a, b, action, expected }) => {
    test(`should perform ${action} with ${a} and ${b}`, () => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    });
  });
});
