import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 10, b: 5, action: Action.Subtract, expected: 5 },
  { a: 8, b: 3, action: Action.Subtract, expected: 5 },
  { a: 1, b: 0, action: Action.Subtract, expected: 1 },
  { a: 3, b: 4, action: Action.Multiply, expected: 12 },
  { a: 5, b: 5, action: Action.Multiply, expected: 25 },
  { a: 0, b: 9, action: Action.Multiply, expected: 0 },
  { a: 10, b: 2, action: Action.Divide, expected: 5 },
  { a: 9, b: 3, action: Action.Divide, expected: 3 },
  { a: 2, b: 8, action: Action.Exponentiate, expected: 256 },
  { a: 3, b: 3, action: Action.Exponentiate, expected: 27 },
  { a: 1, b: 2, action: 'invalid', expected: null },
  { a: 'five', b: 3, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should return $expected when a=$a, b=$b, action=$action',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
