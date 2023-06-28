import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 10, b: -4, action: Action.Subtract, expected: 14 },
  { a: 6, b: 2, action: Action.Subtract, expected: 4 },
  { a: 6, b: 2, action: Action.Multiply, expected: 12 },
  { a: 10, b: -10, action: Action.Multiply, expected: -100 },
  { a: 5, b: 5, action: Action.Multiply, expected: 25 },
  { a: 100, b: 5, action: Action.Divide, expected: 20 },
  { a: 50, b: 10, action: Action.Divide, expected: 5 },
  { a: 63, b: 9, action: Action.Divide, expected: 7 },
  { a: 2, b: 5, action: Action.Exponentiate, expected: 32 },
  { a: 3, b: 3, action: Action.Exponentiate, expected: 27 },
  { a: 4, b: 2, action: Action.Exponentiate, expected: 16 },
  { a: '32', b: 2, action: Action.Add, expected: null },
  { a: true, b: 2, action: Action.Add, expected: null },
  { a: 3, b: null, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'simpleCalculator({ $a, $b, $action }) should be %expected',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toEqual(expected);
    },
  );
});
