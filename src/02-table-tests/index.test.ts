import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },

  { a: 5, b: 1, action: Action.Subtract, expected: 4 },
  { a: 5, b: 2, action: Action.Subtract, expected: 3 },
  { a: 5, b: 3, action: Action.Subtract, expected: 2 },

  { a: 1, b: 2, action: Action.Multiply, expected: 2 },
  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },

  { a: 8, b: 2, action: Action.Divide, expected: 4 },
  { a: 8, b: 4, action: Action.Divide, expected: 2 },
  { a: 8, b: 8, action: Action.Divide, expected: 1 },

  { a: 2, b: 1, action: Action.Exponentiate, expected: 2 },
  { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },

  { a: 3, b: 2, action: null, expected: null },
  { a: 3, b: 2, action: undefined, expected: null },
  { a: 3, b: 2, action: 'InvalidAction', expected: null },

  { a: 'string', b: 'string', action: Action.Add, expected: null },
  { a: null, b: null, action: Action.Add, expected: null },
  { a: undefined, b: undefined, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    '$a $action $b = $expected',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
