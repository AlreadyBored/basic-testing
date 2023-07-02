// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    { a: 2, b: 2, action: Action.Add, expected: 4 },
    { a: 3, b: 2, action: Action.Add, expected: 5 },
    { a: 4, b: 2, action: Action.Divide, expected: 2 },
    { a: 6, b: 2, action: Action.Divide, expected: 3 },
    { a: 6, b: 3, action: Action.Divide, expected: 2 },
    { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
    { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
    { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
    { a: 2, b: 2, action: Action.Multiply, expected: 4 },
    { a: 2, b: 3, action: Action.Multiply, expected: 6 },
    { a: 4, b: 4, action: Action.Multiply, expected: 16 },
    { a: 4, b: 2, action: Action.Subtract, expected: 2 },
    { a: 6, b: 3, action: Action.Subtract, expected: 3 },
    { a: 4, b: 4, action: Action.Subtract, expected: 0 },
    { a: "one", b: 2, action: Action.Subtract, expected: null },
    { a: 6, b: [3], action: Action.Subtract, expected: null },
    { a: 4, b: 4, action: "Action.Subtract.Contract", expected: null },
];

describe('simpleCalculator', () => {
  test('should blah-blah', () => {
    testCases.forEach((_case) => {
      expect(simpleCalculator({ ..._case })).toBe(_case.expected);
    })
    expect(true).toBe(true);
  });
});
