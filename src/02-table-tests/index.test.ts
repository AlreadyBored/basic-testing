import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 0.1, b: 2, action: Action.Multiply, expected: 0.2 },
  { a: 0.1, b: 2, action: Action.Divide, expected: 0.05 },
  { a: 2, b: 10, action: Action.Exponentiate, expected: 1024 },
  { a: 0.1, b: 2, action: 'Invalid', expected: null },
  { a: 1, b: 2n, action: Action.Exponentiate, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)('should blah-blah', ({ a, b, action, expected }) => {
    expect(simpleCalculator({ a, b, action })).toBe(expected);
  });
});
