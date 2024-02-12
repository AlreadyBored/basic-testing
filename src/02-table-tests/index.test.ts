import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 5, b: 3, action: Action.Subtract, expected: 2 },
  { a: 4, b: 2, action: Action.Subtract, expected: 2 },
  { a: 8, b: 3, action: Action.Subtract, expected: 5 },
  { a: 2, b: 3, action: Action.Multiply, expected: 6 },
  { a: 4, b: 2, action: Action.Multiply, expected: 8 },
  { a: 3, b: 3, action: Action.Multiply, expected: 9 },
  { a: 6, b: 3, action: Action.Divide, expected: 2 },
  { a: 10, b: 2, action: Action.Divide, expected: 5 },
  { a: 15, b: 3, action: Action.Divide, expected: 5 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 4, b: 2, action: Action.Exponentiate, expected: 16 },
  { a: 3, b: 2, action: 'invalidAction', expected: null },
  { a: 5, b: 3, action: 'invalidAction', expected: null },
  { a: 10, b: 2, action: 'invalidAction', expected: null },
  { a: 3, b: 'invalidNumber', action: Action.Add, expected: null },
  { a: 5, b: '3', action: Action.Subtract, expected: null },
  { a: null, b: 2, action: Action.Multiply, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    `should make correct action`,
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toEqual(expected);
    },
  );
});