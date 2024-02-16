import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 1, b: 2, action: Action.Subtract, expected: -1 },
  { a: 2, b: 2, action: Action.Subtract, expected: 0 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 1, b: 2, action: Action.Multiply, expected: 2 },
  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 2, b: 2, action: Action.Divide, expected: 1 },
  { a: 2, b: 1, action: Action.Divide, expected: 2 },
  { a: 6, b: 2, action: Action.Divide, expected: 3 },
  { a: 1, b: 2, action: Action.Exponentiate, expected: 1 },
  { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: '1', b: 2, action: Action.Exponentiate, expected: null },
  { a: null, b: 2, action: Action.Exponentiate, expected: null },
  { a: undefined, b: null, action: Action.Exponentiate, expected: null },
  { a: 1, b: 2, action: 'Action.Exponentiate', expected: null },
  { a: 2, b: 2, action: null, expected: null },
  { a: 3, b: 2, action: undefined, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'simpleCalculator tests',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
