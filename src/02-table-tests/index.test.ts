import { simpleCalculator, Action } from './index';

describe('simpleCalculator', () => {
  const testCases = [
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    { a: 3, b: 2, action: Action.Subtract, expected: 1 },
    { a: 2, b: 3, action: Action.Multiply, expected: 6 },
    { a: 6, b: 2, action: Action.Divide, expected: 3 },
    { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
    { a: 'invalid', b: 2, action: Action.Add, expected: null },
    { a: 1, b: 'invalid', action: Action.Add, expected: null },
    { a: 1, b: 2, action: 'invalid', expected: null },
  ];

  testCases.forEach(({ a, b, action, expected }) => {
    it(`should return ${expected} when a is ${a}, b is ${b}, and action is ${action}`, () => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    });
  });
});
