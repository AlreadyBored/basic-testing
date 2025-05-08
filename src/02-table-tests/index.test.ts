// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: -5, b: -3, action: Action.Subtract, expected: -2 },
  { a: 2, b: 3, action: Action.Multiply, expected: 6 },
  { a: -6, b: 2, action: Action.Divide, expected: -3 },
  { a: 2, b: 4, action: Action.Exponentiate, expected: 16 },
  { a: 10, b: 5, action: 'invalid-action', expected: null },
  { a: 'invalid-input', b: 1, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should return $expected when a=$a, action=$action, b=$b',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });

      expect(result).toBe(expected);
    },
  );
});
