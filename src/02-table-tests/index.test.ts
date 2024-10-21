import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 4, b: 8, action: Action.Add, expected: 12 },
  { a: 15, b: 3, action: Action.Subtract, expected: 12 },
  { a: 8, b: 3, action: Action.Multiply, expected: 24 },
  { a: 20, b: 5, action: Action.Divide, expected: 4 },
  { a: 2, b: 6, action: Action.Exponentiate, expected: 64 },
  { a: 4, b: 4, action: 'InvalidAction', expected: null },
  { a: '8', b: 5, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  testCases.forEach(({ a, b, action, expected }) => {
    test(`Executing ${action} of ${a} and ${b} should yield ${expected}`, () => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    });
  });
});
