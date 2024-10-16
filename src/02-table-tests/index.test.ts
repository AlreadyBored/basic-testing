import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },

  { a: 7, b: 7, action: Action.Subtract, expected: 0 },
  { a: 10, b: 4, action: Action.Subtract, expected: 6 },
  { a: 7, b: 2, action: Action.Subtract, expected: 5 },

  { a: 7, b: 7, action: Action.Multiply, expected: 49 },
  { a: 5, b: 5, action: Action.Multiply, expected: 25 },
  { a: 3, b: 7, action: Action.Multiply, expected: 21 },

  { a: 3, b: 3, action: Action.Divide, expected: 1 },
  { a: 280, b: 4, action: Action.Divide, expected: 70 },
  { a: 9, b: 3, action: Action.Divide, expected: 3 },

  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 5, b: 3, action: Action.Exponentiate, expected: 125 },

  { a: 1, b: 2, action: '--', expected: null },
  { a: 5, b: 3, action: 'gfdhgdf', expected: null },
  { a: 2, b: 2, action: '%', expected: null },

  { a: '1', b: 3, action: Action.Subtract, expected: null },
  { a: 4, b: '2', action: Action.Multiply, expected: null },
  { a: undefined, b: 'null', action: Action.Divide, expected: null },
];

describe('simpleCalculator test table-driven', () => {
  test.each(testCases)(
    'should calculate $a $action $b = $expected',
    ({ a, b, action, expected }) => {
      const res = simpleCalculator({ a, b, action });
      expect(res).toBe(expected);
    },
  );
});
