import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 7, b: 6, action: Action.Add, expected: 13 },
  { a: -7, b: 6, action: Action.Add, expected: -1 },
  { a: 7, b: 6, action: Action.Subtract, expected: 1 },
  { a: -7, b: 6, action: Action.Subtract, expected: -13 },
  { a: 2, b: 2, action: Action.Subtract, expected: 0 },
  { a: 7, b: 6, action: Action.Multiply, expected: 42 },
  { a: -7, b: 6, action: Action.Multiply, expected: -42 },
  { a: 0, b: 2, action: Action.Multiply, expected: 0 },
  { a: 15, b: 3, action: Action.Divide, expected: 5 },
  { a: -15, b: 3, action: Action.Divide, expected: -5 },
  { a: 0, b: 2, action: Action.Divide, expected: 0 },
  { a: 2, b: 0, action: Action.Divide, expected: Infinity },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: -2, b: 3, action: Action.Exponentiate, expected: -8 },
  { a: 2, b: -3, action: Action.Exponentiate, expected: 0.125 },
  { a: 0, b: 3, action: Action.Exponentiate, expected: 0 },
  { a: 7, b: 6, action: '%', expected: null },
  { a: '7', b: 6, action: Action.Add, expected: null },
  { a: 7, b: '6', action: Action.Add, expected: null },
  { a: null, b: 6, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should return $expected for a=$a, b=$b, action=$action',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
